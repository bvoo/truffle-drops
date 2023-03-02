<template>
  <div class="table-container">
    <div class="table-info">
      <slot />
    </div>
    <OverlayScrollbarsComponent class="table-body">
      <table v-if="table" :style="`--table-columns: ${columns.length};`">
        <thead>
          <tr v-for="group in table.getHeaderGroups()" :key="group.id">
            <th v-for="header in group.headers" :key="header.id">
              <FlexRender :render="header.column.columnDef.header" :props="header.getContext()" />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in table.getRowModel().rows" :key="row.id">
            <td v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
            </td>
          </tr>
        </tbody>
      </table>
    </OverlayScrollbarsComponent>
    <div class="table-footer">
      <span class="text-secondary mr-2">Rows</span>
      <span class="font-medium text-primary">{{ data.length }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FlexRender, getCoreRowModel, useVueTable, type ColumnDef } from '@tanstack/vue-table';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-vue';

type TableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
};

const props = defineProps<TableProps<any>>();

const table = computed(() => {
  if (!props.data || !props.columns) return null;

  return useVueTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
  });
});
</script>

<style lang="scss">
.table-container,
.table-container > *,
.table-container > .table-body > .os-viewport > table,
.table-container > .table-body > .os-viewport > table th,
.table-container > .table-body > .os-viewport > table td {
  @apply border-black border-opacity-20 dark:(border-white border-opacity-20);
}

.table-container {
  @apply bg-semi-primary rounded-md flex flex-col h-full border-1px;

  > .table-info {
    @apply border-b-1px;
  }

  > .table-info,
  > .table-footer {
    @apply p-2;
  }

  > .table-footer {
    @apply border-t-1px;
  }

  > .table-body > .os-viewport {
    > table {
      @apply border-collapse w-full grid;

      grid-template-columns: 1fr repeat(calc(var(--table-columns) - 1), max-content);
    }

    th {
      @apply bg-secondary backdrop-blur-md backdrop-filter;
    }

    thead,
    tbody,
    tr {
      @apply contents;
    }

    th {
      @apply py-1;
    }

    th,
    td {
      @apply border-r-1px border-b-1px px-2 overflow-hidden overflow-ellipsis whitespace-nowrap;
    }

    td {
      @apply py-2;
    }

    td:last-child,
    th:last-child {
      @apply border-r-0;
    }

    tr:last-child > td {
      @apply border-b-0;
    }

    th {
      @apply text-left top-0 sticky;
    }
  }
}
</style>
