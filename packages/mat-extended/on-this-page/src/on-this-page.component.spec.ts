import { describe, it, expect, beforeEach } from 'vitest';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RuiOnThisPage } from './on-this-page.component';

@Component({
  standalone: true,
  imports: [RuiOnThisPage],
  template: `
    <main>
      <h2 id="first">First Heading</h2>
      <p>Some content</p>
      <h2 id="second">Second Heading</h2>
      <p>More content</p>
      <h2 id="third">Third Heading</h2>
    </main>
    <rui-on-this-page />
  `,
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [RuiOnThisPage],
  template: `
    <main>
      <h2 id="test">Test</h2>
    </main>
    <rui-on-this-page title="Table of Contents" />
  `,
})
class CustomTitleHostComponent {}

describe('RuiOnThisPage', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RuiOnThisPage, TestHostComponent, CustomTitleHostComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('creates the component', () => {
    const fixture = TestBed.createComponent(RuiOnThisPage);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders nav with aria-label', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav.getAttribute('aria-label')).toBe('On this page');
  });

  it('renders heading links', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.rui-on-this-page__link');
    expect(links.length).toBe(3);
    expect(links[0].textContent.trim()).toBe('First Heading');
    expect(links[1].textContent.trim()).toBe('Second Heading');
    expect(links[2].textContent.trim()).toBe('Third Heading');
  });

  it('marks first item as active by default', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.rui-on-this-page__link');
    expect(links[0].classList.contains('rui-on-this-page__link--active')).toBe(true);
    expect(links[1].classList.contains('rui-on-this-page__link--active')).toBe(false);
  });

  it('does not render when no headings found', () => {
    TestBed.configureTestingModule({
      imports: [RuiOnThisPage],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(RuiOnThisPage);
    fixture.detectChanges();
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav).toBeNull();
  });

  it('uses custom title', () => {
    const fixture = TestBed.createComponent(CustomTitleHostComponent);
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.rui-on-this-page__title');
    expect(title.textContent.trim()).toBe('Table of Contents');
  });

  it('has tabindex on links for keyboard navigation', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.rui-on-this-page__link');
    links.forEach((link: Element) => {
      expect(link.getAttribute('tabindex')).toBe('0');
    });
  });
});
