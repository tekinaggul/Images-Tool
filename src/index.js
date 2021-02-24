import ajax from '@codexteam/ajax';

export default class ImagesTool {
  constructor({ config }) {
    this.config = config;
  }

  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    };
  }

  render() {
    const wrapper = document.createElement('div');

    const button = document.createElement('button');
    button.innerHTML = 'Resim Seç';
    button.style.width = '100%';
    button.style.backgroundColor = 'green';
    button.style.border = '0';
    button.style.color = '#ffffff';
    button.style.marginTop = '10px';
    button.style.marginBottom = '20px';

    const images = document.createElement('div');
    images.classList.add('images');

    button.addEventListener('click', () => {
      const upload = ajax.transport({
        url: this.config.endpoints.byFile,
        data: {},
        accept: 'image/*',
        fieldName: 'image',
        multiple: true,
        beforeSend: (files) => {
          console.log(files);
          // preparePreview(files[0]);
        },
      }).then((response) => response.body);

      upload.then((response) => {
        console.log(response);
        this.data = this.data || [];
        // const html = response.files.map((image) => `<img src="${image.url}" />`);
        for (let i = 0; i < response.files.length; i++) {
          const element = response.files[i];
          this.data.push(element);
          const image = document.createElement('img');
          image.style.width = '100%';

          const input = document.createElement('input');
          input.style.width = '100%';
          input.style.marginTop = '10px';
          input.style.marginBottom = '20px';
          input.addEventListener('input', (e) => {
            // WARNING : resim urlleri farklı olacağı düşünüldüğü için bu kontrol yazıldı.
            for (let j = 0; j < this.data.length; j++) {
              if (this.data[j].url === element.url) {
                this.data[j].text = e.target.value;
              }
            }
          });
          image.setAttribute('src', element.url);
          images.appendChild(image);
          images.appendChild(input);
        }
      }).catch((error) => {
        console.log(error);
        alert(error);
      });
    });

    wrapper.appendChild(images);
    wrapper.appendChild(button);

    // return document.createElement('input');
    return wrapper;
  }

  save() {
    return this.data;
  }
}
