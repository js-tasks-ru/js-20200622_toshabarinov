export default class ColumnChart {

  constructor({
    data = [],
    label = 'empty',
    link = '',
    value = '',
    chartHeight = 50
  } = {}) {
    this._data = data;
    this._label = label;
    this._link = link;
    this._value = value;
    this.chartHeight = chartHeight; // Why do we need it ?

    this.calculateDataValues();
    this.render();
  }

  update(newData) {
    this._data = newData.bodyData;
    this.calculateDataValues();
    this.body.innerHTML = this.dataTemplate;
  }

  render() {
    this.element = document.createElement('div');
    this.element.innerHTML = `
        <div class='column-chart'>
          <div class='column-chart__title'>
            ${'Total ' + this._label}
            ${this.generateLinkElement()}
          </div>
          <div class='column-chart__container'>
            <div class='column-chart__header'>${this._value}</div>
            <div class='column-chart__chart' >
              ${this.dataTemplate}
            </div>
          </div>
        </div>
      `;

    this.body = this.element.querySelector('.column-chart__chart');

    if (!this._data.length) {
      this.element.className = 'column-chart_loading';
    }
  }

  get dataTemplate() {
    return `${this._data.map(dataElement => this.generateValueElement(dataElement)).join('')}`;
  }

  remove() {
    this.element.remove();
  }

  generateLinkElement() {
    return this._link ? `<a class='column-chart__link' href='${this._link}'>View all</a>` : '';
  }

  generateValueElement(dataElement) {
    return `<div style='--value:${dataElement.scaledValue}' data-tooltip='${dataElement.percent}'></div>`;
  }

  calculateDataValues() {
    const maxValue = Math.max(...this._data);
    const scale = 50 / maxValue;

    this._data = this._data.map(item => {
      return {
        value: item,
        scaledValue: String(Math.floor(item * scale)),
        percent: (item / maxValue * 100).toFixed(0) + '%'
      };
    });
  }

  destroy() {
    this.remove();
  }
}
