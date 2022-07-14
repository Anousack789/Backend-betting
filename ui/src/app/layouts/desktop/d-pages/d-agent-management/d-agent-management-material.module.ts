import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  exports: [MatTableModule, MatIconModule, MatPaginatorModule, MatButtonModule],
})
export class DAgentManagementMaterialModule {}
