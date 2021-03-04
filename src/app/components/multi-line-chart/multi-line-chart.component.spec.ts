import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiLineChartComponent } from './multi-line-chart.component';
import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';


describe('MultiLineChartComponent', () => {
  let component: MultiLineChartComponent;
  let fixture: ComponentFixture<MultiLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiLineChartComponent],
      imports: [
        HttpClientModule,
        ApolloTestingModule,
        ApolloModule,
        HttpLinkModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
