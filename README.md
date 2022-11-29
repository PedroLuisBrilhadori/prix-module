# Prix-Module

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![GitHub repo size](https://shields.io/github/repo-size/PedroLuisBrilhadori/prix-module?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/PedroLuisBrilhadori/prix-module?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/PedroLuisBrilhadori/prix-module?style=for-the-badge)
![Bitbucket open issues](https://img.shields.io/github/issues/PedroLuisBrilhadori/prix-module?style=for-the-badge)
![Bitbucket open pull requests](https://img.shields.io/github/issues-pr/PedroLuisBrilhadori/prix-module?style=for-the-badge)

> Modulo para enviar preço, enviar tara de peso e receber o peso da balança Toledo Prix 3 fit.

### Ajustes e melhorias

O projeto ainda está em desenvolvimento e as próximas atualizações serão voltadas nas seguintes tarefas:

- [x] Receber peso
- [x] Enviar preço
- [x] Enviar tara de peso

## 💻 Pré-requisitos

- NodeJS
- O projeto deve conter uma lib de comunicação serial, recomendo a [SerialPort](https://www.npmjs.com/package/serialport)

## 🚀 Instalando Prix-Module

Para instalar o Prix-Module, siga estas etapas:

```shell
npm install prix-module
# or
yarn add prix-module
```

## ☕ Usando Prix-Module

Para usar Prix-Module, siga estas etapas:

```ts
import { SerialPort } from "serialport";
import Prix3Fit from "prix-module";

const scale = Prix3Fit(
  SerialPort({
    path: "COM6",
    baudRate: 4800,
  })
);

// retorna peso atual da balança
scale.getWeight().then((weight) => console.log(weight));

// define o preço na balança
scale.setPrice(3.5);

// define a tara na balança
scale.setTare(100);
```

## 📫 Contribuindo para Prix-Module

<!---Se o seu README for longo ou se você tiver algum processo ou etapas específicas que deseja que os contribuidores sigam, considere a criação de um arquivo CONTRIBUTING.md separado--->

Para contribuir com Prix-Module, siga estas etapas:

1. Bifurque este repositório.
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin Prix-Module / <local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

[⬆ Voltar ao topo](#nome-do-projeto)<br>
