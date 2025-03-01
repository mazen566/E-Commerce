import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{
  private readonly categoriesService = inject(CategoriesService);
  categories:ICategories[] = [];

  ngOnInit(): void {
    this.getCategoriesData()
  }

  getCategoriesData():void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categories = res.data;
      },
    })
  }
}
