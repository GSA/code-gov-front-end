import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
export default class BrowseProjects extends React.Component {

  componentDidMount () {
    if (!this.props.agencies) this.props.saveAgencies();
  }

  get repoCounter() {
    const { total } = this.props
    let textContent
    if (total === 0) {
      textContent = 'No Repositories'
    } else if (total === 1) {
      textContent = '1 Repository'
    } else if (total >= 2) {
      textContent = `${total} Repositories`
    } else {
      textContent = 'Loading Repositories'
    }
    return <h3 className="repos-count width-three-quarters">{textContent}</h3>
  }

  render() {
    return (
      <div className="search-results-content">
        <simple-banner image={this.props.backgroundImage} title='Browse Projects' />
        <div className="indented">
          <ul className="breadcrumbs">
            <li><Link to="/">Home</Link></li>
            <li>Browse Projects</li>
          </ul>
        </div>
        <div className="search-results-header">
            <div className="indented">
              <div className="width-quarter"></div>
              {this.repoCounter}
            </div>
          </div>
        <div className="indented">
          <div id="filter-boxes-section">
            <h2>Filter</h2>

            <filter-box
              title="Language"
              options={this.props.languages}
              onChange={this.onFilterBoxChange}
            ></filter-box>

            <filter-box
              title="Federal Agency"
              options={this.props.agencies}
              onChange={this.onFilterBoxChange}
            ></filter-box>

            <filter-box
              title="License"
              options={this.props.licenses}
              onChange={this.onFilterBoxChange}
            ></filter-box>

            <filter-box
              title="Usage Type"
              options='[{"name":"Open Source","value":"openSource"},{"name":"Government-Wide Reuse","value":"governmentWideReuse"}]'
              onChange={this.onFilterBoxChange}
            ></filter-box>

          </div>
          {/*
          <div id="filter-results-section">
            <div className="sort-section">
              <h2>
                <span>Sort by</span>
                <select [(ngModel)]="selectedSortOption" (change)="onSortSelectionChange()">
                  <option *ngFor="let opt of sortOptions" [ngValue]="opt" [textContent]="opt"></option>
                </select>
              </h2>
            </div>
            <div className="filter-tags">
              <div className="filter-tag" *ngFor="let filterTag of filterTags" (click)="removeFilterTag(filterTag)">
                <div className="filter-tag-title">{{filterTag.name}}</div>
              </div>
            </div>
            <div *ngIf="isLoading">
              Loading
            </div>
            <repo-list *ngIf="!isLoading" [queryValue]="queryValue" [results]="finalResults" [pageSize]="pageSize"></repo-list>
          </div>
          */}
        </div>
      </div>
    )
  }
}
