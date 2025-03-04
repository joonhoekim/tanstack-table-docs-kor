---
title: Angular Table
---

`@tanstack/angular-table` 어댑터는 핵심 테이블 로직을 감싸는 래퍼입니다. 주요 역할은 "angular signals" 방식으로 상태를 관리하고, 타입을 제공하며, cell/header/footer 템플릿의 렌더링 구현을 제공하는 것입니다.

## Exports

`@tanstack/angular-table`은 `@tanstack/table-core`의 모든 API와 다음을 다시 내보냅니다:

### `createAngularTable`

테이블 옵션을 반환하는 옵션 함수나 computed 값을 받아 테이블을 반환합니다.

```ts
import {createAngularTable} from '@tanstack/angular-table'

export class AppComponent {
  data = signal<Person[]>([])

  table = createAngularTable(() => ({
    data: this.data(),
    columns: defaultColumns,
    getCoreRowModel: getCoreRowModel(),
  }))
}

// ...템플릿에서 테이블 렌더링

```

### `FlexRender`

동적 값으로 cell/header/footer 템플릿을 렌더링하기 위한 Angular 구조 디렉티브입니다.

FlexRender는 Angular에서 지원하는 모든 유형의 콘텐츠를 지원합니다:

- 문자열 또는 `innerHTML`을 통한 html 문자열
- [TemplateRef](https://angular.dev/api/core/TemplateRef)
- `FlexRenderComponent`로 래핑된 [Component](https://angular.dev/api/core/Component)

테이블의 셀을 렌더링하기 위해 `cell.renderValue` 또는 `cell.getValue` API를 사용할 수 있습니다. 그러나,
이러한 API는 원시 셀 값(접근자 함수에서)만 출력합니다.
`cell: () => any` 열 정의 옵션을 사용하는 경우, 어댑터의 `FlexRenderDirective`를 사용하고 싶을 것입니다.

셀 열 정의는 **반응형**이며 **주입 컨텍스트**에서 실행되므로, 서비스를 주입하거나 signals를 사용하여 렌더링된 콘텐츠를 자동으로 수정할 수 있습니다.

#### 예시

```ts
@Component({
  imports: [FlexRenderDirective],
  //...
})
class YourComponent {}
```

#### 컴포넌트 렌더링하기

특정 열의 header/cell/footer에 컴포넌트를 렌더링하려면, inputs, outputs 및 사용자 지정 injector와 같은 매개변수를 포함할 수 있는 기능과 함께 `ComponentType`으로 인스턴스화된 `FlexRenderComponent`를 전달할 수 있습니다.

```ts
import {flexRenderComponent} from "./flex-render-component";
import {ChangeDetectionStrategy, input, output} from "@angular/core";

@Component({
  template: `
    ...
  `,
  standalone: true,
  changeDetectionStrategy: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'clickEvent.emit($event)'
  }
})
class CustomCell {
  readonly content = input.required<string>();
  readonly cellType = input<MyType>();

  // 모든 셀 클릭에 대해 이벤트를 발생시키는 output
  readonly clickEvent = output<Event>();
}

class AppComponent {
  columns: ColumnDef<unknown>[] = [
    {
      id: 'custom-cell',
      header: () => {
        const translateService = inject(TranslateService);
        return translateService.translate('...');
      },
      cell: (context) => {
        return flexRenderComponent(
          MyCustomComponent,
          {
            injector, // 선택적 injector
            inputs: {
              // input.required()를 사용하므로 필수 input
              content: context.row.original.rowProperty,
              // cellType? - 선택적 input
            },
            outputs: {
              clickEvent: () => {
                // 무언가 수행
              }
            }
          }
        )
      },
    },
  ]
}
```

내부적으로 이는 [ViewContainerRef#createComponent](https://angular.dev/api/core/ViewContainerRef#createComponent) API를 활용합니다.
따라서 @Input 데코레이터나 input/model signals를 사용하여 사용자 지정 inputs를 선언해야 합니다.

`FlexRenderDirective`에 전달하는 props를 기반으로 컨텍스트 값을 반환하는 `injectFlexRenderContext` 함수를 통해 테이블 셀 컨텍스트에 액세스할 수도 있습니다.

```ts

@Component({
  // ...
})
class CustomCellComponent {
  // 셀 컴포넌트의 컨텍스트
  readonly context = injectFlexRenderContext<CellContext<TData, TValue>>();
  // header/footer 컴포넌트의 컨텍스트
  readonly context = injectFlexRenderContext<HeaderContext<TData, TValue>>();
}
```

또는 해당 열 정의에 컴포넌트 타입을 전달하여 특정 열의 header, cell 또는 footer에 컴포넌트를 렌더링할 수 있습니다. 이러한 열 정의는 `context`와 함께 `flexRender` 디렉티브에 제공됩니다.

```ts
class AppComponent {
  columns: ColumnDef<Person>[] = [
    {
      id: 'select',
      header: () => TableHeadSelectionComponent<Person>,
      cell: () => TableRowSelectionComponent<Person>,
    },
  ]
}
```

```angular-html
<ng-container
  *flexRender="
    header.column.columnDef.header;
    props: header.getContext();
    let headerCell
  "
>
  {{ headerCell }}
</ng-container>
```

`flexRender` 디렉티브에 제공된 `context`의 속성은 컴포넌트에서 접근할 수 있습니다.
컴포넌트에 필요한 컨텍스트 속성을 명시적으로 정의할 수 있습니다.
이 예시에서 flexRender에 제공된 컨텍스트는 HeaderContext 타입입니다.
HeaderContext의 속성인 input signal `table`은 `column` 및 `header` 속성과 함께 컴포넌트에서 사용하기 위해 정의됩니다. 컴포넌트에서 컨텍스트 속성이 필요한 경우 자유롭게 사용하세요. 이 접근 방식을 사용할 때 컨텍스트 속성에 대한 접근을 정의할 때는 input signal만 지원된다는 점에 유의하세요.

```angular-ts
@Component({
  template: `
    <input
      type="checkbox"
      [checked]="table().getIsAllRowsSelected()"
      [indeterminate]="table().getIsSomeRowsSelected()"
      (change)="table().toggleAllRowsSelected()"
    />
  `,
  // ...
})
export class TableHeadSelectionComponent<T> {
  //column = input.required<Column<T, unknown>>()
  //header = input.required<Header<T, unknown>>()
  table = input.required<Table<T>>()
}
```

#### TemplateRef 렌더링하기

특정 열의 header/cell/footer에 TemplateRef를 렌더링하려면, TemplateRef를 열 정의에 전달할 수 있습니다.

flexRender의 props 필드에 전달된 내용을 기반으로 값이 지정되는 `$implicit` 속성을 통해 TemplateRef 데이터에 액세스할 수 있습니다.

대부분의 경우, 각 TemplateRef는 셀 유형에 따라 다음과 같은 방식으로 $implicit 컨텍스트 값으로 렌더링됩니다:

- Header: `HeaderContext<T, ?>`
- Cell: `CellContext<T, ?>`,
- Footer: `HeaderContext<T, ?>`

```angular-html

<ng-container
  *flexRender="
              cell.column.columnDef.cell;
              props: cell.getContext();
              let cell
            "
>
  <!-- 단순 문자열을 렌더링하려면 -->
  {{ cell }}
  <!-- html 문자열을 렌더링하려면 -->
  <div [innerHTML]="cell"></div>
</ng-container>

<ng-template #myCell let-context>
  <!-- context로 무언가 렌더링 -->
</ng-template>
```

Full example:

```angular-ts
import type {
  CellContext,
  ColumnDef,
  HeaderContext,
} from '@tanstack/angular-table'
import {Component, TemplateRef, viewChild} from '@angular/core'

@Component({
  template: `
    <tbody>
      @for (row of table.getRowModel().rows; track row.id) {
        <tr>
          @for (cell of row.getVisibleCells(); track cell.id) {
            <td>
              <ng-container
                *flexRender="
                  cell.column.columnDef.cell;
                  props: cell.getContext(); // Data given to the TemplateRef
                  let cell
                "
              >
                <!-- if you want to render a simple string -->
                {{ cell }}
                <!-- if you want to render an html string -->
                <div [innerHTML]="cell"></div>
              </ng-container>
            </td>
          }
        </tr>
      }
    </tbody>

    <ng-template #customHeader let-context>
      {{ context.getValue() }}
    </ng-template>
    <ng-template #customCell let-context>
      {{ context.getValue() }}
    </ng-template>
  `,
})
class AppComponent {
  customHeader =
    viewChild.required<TemplateRef<{ $implicit: HeaderContext<any, any> }>>(
      'customHeader'
    )
  customCell =
    viewChild.required<TemplateRef<{ $implicit: CellContext<any, any> }>>(
      'customCell'
    )

  columns: ColumnDef<unknown>[] = [
    {
      id: 'customCell',
      header: () => this.customHeader(),
      cell: () => this.customCell(),
    },
  ]
}
```
