export default class SortableTable {

  headers = [];
  subElements;

  constructor(headers = [], {data = []} = {}) {
    headers.forEach(header => this.parseHeader(header));
    this.data = data;
    this.render();
  }

  sort(fieldValue = '', orderValue = 'asc') {
    const data = [...this.subElements.children];
    const cellIndex = this.headers.findIndex(header => header.id === fieldValue);
   // console.log("DATA:");
    //data.forEach(val => console.log(val.children[cellIndex].innerHTML));
    let sortFunction;

    switch (this.headers.find(header => fieldValue === header.id)?.sortType) {
    case 'number':
      sortFunction = this.compareNumber;
      break;
    case 'string':
      sortFunction = this.compareString;
    }

    data.sort((first, second) => orderValue === 'asc' ?
      sortFunction(first, second, cellIndex, 'asc') :
      sortFunction(second, first, cellIndex, 'desc'));

    data.forEach(elem => this.subElements.append(elem));
  }

  compareNumber(first, second, cellIndex) {
    return Number.parseFloat(first.children[cellIndex].innerHTML) - Number.parseFloat(second.children[cellIndex].innerHTML);
  }

  compareString(first, second, cellIndex, type) {
    const result =  first.children[cellIndex].innerHTML.localeCompare(second.children[cellIndex].innerHTML, 'ru', {usage: 'sort', caseFirst : "upper"});
  //  console.log(first.children[cellIndex].innerHTML + " : " + second.children[cellIndex].innerHTML + ", result: " + result + ", type: " + type);
    return result;
  }

  get template() {
    return `
    <div data-element="productsContainer" class="products-list__container">
      <div class="sortable-table">
        <div data-element="header" class="sortable-table__header sortable-table__row">
          ${this.headers.map(header => this.generateHeader(header)).join('')}
        </div>
        <div data-element="body" class="sortable-table__body">
          ${this.data.map(dataElement => this.generateDataElement(dataElement)).join('')}
        </div>
        <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
      </div>
    </div>
    `;
  }

  generateDataElement(dataElement) {
    return `
      <a href="#" class="sortable-table__row">
          ${this.headers.map(header => header.template(dataElement, header.id)).join('')}
      </a>
    `;
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
    this.subElements = this.element.getElementsByClassName('sortable-table__body')[0];
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
