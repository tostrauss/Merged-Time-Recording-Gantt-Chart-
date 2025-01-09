import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TimeRecordingService, TimeRecord } from '../services/time-recording.service';
import { Chart } from 'chart.js/auto';
import { Router } from '@angular/router';
import { TimeRecordingHeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, FormsModule, TimeRecordingHeaderComponent],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  private chart: Chart | null = null;
  startDate = '';
  endDate = '';
  records: TimeRecord[] = [];
  graphMessage = '';
  selectedUserId: number | null = null;

  constructor(
    private timeRecordingService: TimeRecordingService,
    private router: Router
  ) {
    // Initialize date filters
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    this.startDate = lastWeek.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    // Subscribe to records updates
    this.timeRecordingService.getRecords().subscribe(records => {
      console.log('Received records:', records); // Debug log
      this.records = records;
      if (this.chartCanvas) {
        this.updateChart();
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => this.updateChart(), 0); // Delay initial chart render
  }

  private updateChart() {
    if (!this.chartCanvas) return;

    const filteredRecords = this.filterRecords();
    console.log('Filtered records:', filteredRecords); // Debug log

    const groupedData = this.groupByDate(filteredRecords);
    console.log('Grouped data:', groupedData); // Debug log
    
    const labels = Array.from(groupedData.keys()).sort();
    const data = labels.map(date => groupedData.get(date) || 0);

    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Hours Worked',
          data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Hours'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Daily Work Hours'
          }
        }
      }
    });
  }

  private filterRecords(): TimeRecord[] {
    return this.records.filter(record => {
      const dateMatches = (!this.startDate && !this.endDate) || 
        (new Date(record.date) >= new Date(this.startDate) && 
         new Date(record.date) <= new Date(this.endDate));
      
      const userMatches = !this.selectedUserId || 
        record.userId === this.selectedUserId;
      
      return dateMatches && userMatches;
    });
  }

  private groupByDate(records: TimeRecord[]): Map<string, number> {
    const grouped = new Map<string, number>();
    records.forEach(record => {
      const date = record.date;
      grouped.set(date, (grouped.get(date) || 0) + record.hoursWorked);
    });
    return grouped;
  }

  applyFilters(): void {
    this.updateChart();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
