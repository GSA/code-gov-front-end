import React from 'react'

export default class HomeBanner extends React.Component {
  render() {
    return (
      <section id="banner-home" class="banner large" [style.background-image]="backgroundImage">
        <div class="banner-content">
          <div class="banner-title">{{content.home.banner.motto}}</div>
          <div class="banner-subtitle">{{content.home.banner.subtitle}}</div>
          <div class="indented">
            <div class="banner-subsection width-half" [style.z-index]="30">
              <div class="banner-subsection-content">
                <div class="banner-subsection-content-padder">
                  <repos-search autofocus=true buttonClasses="alt"></repos-search>
                </div>
              </div>
            </div>
            <div class="vertical-row" *ngIf="content.home.banner.help_wanted?.title || content.home.banner.help_wanted?.description"></div>
            <div class="banner-subsection width-half" id="banner-subsection-engage">
              <div class="banner-subsection-content">
                <div class="banner-subsection-content-padder">
                  <div class="banner-subsection-title" *ngIf="content.home.banner.help_wanted.title">{{content.home.banner.help_wanted.title}}</div>
                  <div class="banner-subsection-subtitle" *ngIf="content.home.banner.help_wanted.description">{{content.home.banner.help_wanted.description}}</div>
                  <div class="buttons" *ngIf="content.home.banner.help_wanted.button">
                      <button class="alt" routerLink="/help-wanted" [textContent]="content.home.banner.help_wanted.button"></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="indented">
            <br/>
            <br/>
            <div class="banner-subsection">
              <div class="banner-subsection-subtitle" id="issue-banner-subsection-subtitle">
                <img class="chat" src="/assets/img/icons/chat_bubble.png">
                  <span>Have questions or feedback? Open an issue on our open source repository <a class="link" href="{{content.home.banner.issue_url}}" id="issue-link" target="_blank">here</a>.</span>
              </div>
            </div>
          </div>
        </div>
      
        <a
          class="scroll-indicator"
          title="Scroll Down"
          (click)="scrollToAbout()"
        >
          <i class="icon icon-angle-down"></i>
        </a>
      
      </section>
    )
  }
}