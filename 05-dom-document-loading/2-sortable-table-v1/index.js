export default class SortableTable {

  headers = [];
  subElements = {};

  constructor(headers = [], {data = []} = {}) {
    headers.forEach(header => this.parseHeader(header));
    this.data = data;
    this.render();
  }

  sort(fieldValue = '', orderValue = 'asc') {
    let sortFunction;
    const sortType = this.headers.find(header => fieldValue === header.id)?.sortType;

    switch (sortType) {
    case 'number':
      sortFunction = this.compareNumber;
      break;
    case 'string':
      sortFunction = this.compareString;
    }

    this.data.sort((first, second) => orderValue === 'asc' ?
      sortFunction(first, second, fieldValue) :
      sortFunction(second, first, fieldValue));

    this.subElements.body.innerHTML = this.generateTableEntries();
  }

  compareNumber(first, second, fieldValue) {
    return first[fieldValue] - second[fieldValue];
  }

  compareString(first, second, fieldValue) {
    return first[fieldValue].localeCompare(second[fieldValue], 'ru-RU', {caseFirst: "upper"});
  }

  get template() {
    return `
    <div data-element="productsContainer" class="products-list__container">
      <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.headers.map(header => this.generateHeader(header)).join('')}
        </div>
        <div data-element="body" class="sortable-table__body">
          ${this.generateTableEntries()}
        </div>
        <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
      </div>
    </div>
    `;
  }

  generateTableEntries() {
    return this.data.map(dataElement =>
      `<a href="#" class="sortable-table__row">
          ${this.headers.map(header => header.template(dataElement, header.id)).join('')}
       </a>`
    ).join('');
  }

  generateHeader(header) {
    return `
      <div class="sortable-table__cell" data-name="title" data-sortable="">
        <span>${header.title}</span>
        ${header.sortable ? `
          <span class="sortable-table__sort-arrow">
            <span class="sort-arrow"></span>
          </span>` : ''}
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.template;
    this.element = element.firstElementChild;
    this.subElements.body = this.element.querySelector('.sortable-table__body');
  }

  parseHeader({
    id = Math.random() * 1000,
    title = 'Title',
    sortable = false,
    sortType = 'string',
    template = (elem = {}, key = '') => `<div class="sortable-table__cell">${elem[key]}</div>`} = {}) {
    this.headers.push({
      id: id,
      title: title,
      sortable: sortable,
      sortType: sortType,
      template: template,
    });
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
