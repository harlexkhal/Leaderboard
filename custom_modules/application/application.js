import NetworkGateway from '../gateway/gateway.js';

class Application {
  constructor() {
    this.gateWay = new NetworkGateway();
    this.gateWay.getID('Seed');

    this.inputs = document.querySelectorAll('.userdetails');
    this.success_message = document.querySelector('.success-message');
    this.form = document.querySelector('.data-form');
    this.loadingAnime = document.querySelector('.loading_anime');
    this.tableList = document.querySelector('.table-content');
    this.refreshBtn = document.querySelector('.f5');
  }

  initApp = () => {
    this.form.addEventListener('submit', (event) => {
      const refInstance = event.currentTarget.ref;
      refInstance.addUserScore();
      event.preventDefault();
    });
    this.form.ref = this;

    this.refreshBtn.addEventListener('click', (event) => {
      event.currentTarget.ref.refreshList();
    });
    this.refreshBtn.ref = this;
  }

  addUserScore = () => {
    this.showLoader();
    const res = this.gateWay.insertData(this.inputs[0].value, this.inputs[1].value);
    res.then((data) => {
      this.success_message.innerHTML = data.result;

      this.inputs[0].value = '';
      this.inputs[1].value = '';

      this.hideLoader();
      this.refreshList();

      const ref = this;
      setTimeout(() => { ref.success_message.innerHTML = ''; }, 1800, ref);
    })
      .catch((error) => {
        throw error;
      });
  }

  refreshList = () => {
    this.showLoader();
    const res = this.gateWay.fetchData();
    res.then((data) => {
      let domContent = '';
      const users = data.result;
      users.forEach((user) => {
        domContent = `${domContent}<tr class="animate__animated animate__bounceInLeft">
        <td>${user.user}</td>
        <td class="text-primary">${user.score}</td>
        </tr>`;
      });
      this.hideLoader();
      this.tableList.innerHTML = domContent;
    })
      .catch((error) => {
        throw error;
      });
  }

  showLoader = () => {
    this.loadingAnime.classList.remove('hide');
    this.loadingAnime.classList.add('show');
  }

  hideLoader = () => {
    this.loadingAnime.classList.remove('show');
    this.loadingAnime.classList.add('hide');
  }
}

export default Application;