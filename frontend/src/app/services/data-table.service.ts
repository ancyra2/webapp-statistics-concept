import { Injectable } from '@angular/core';

export interface PieChartData{
pieName: string,
metricUnit: number,
}

@Injectable({
  providedIn: 'root'
})


export class DataTableService {

  constructor() { }

  getPieChartData(pieHeader: string, pieMetricUnitName: string): PieChartData[]{
    return [
      {pieName: "Getir", metricUnit: 37.5},
      {pieName: "Yemeksepeti", metricUnit: 12.5},
      {pieName: "Trendyol Yemek", metricUnit: 35},
      {pieName: "Migros Yemek", metricUnit: 15},
    ]
  }
}
