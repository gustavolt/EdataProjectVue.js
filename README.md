# Introdução

Projeto de template da Bitzar para ser utilizado de modelo em novos projetos.

# Primeiros Passos

Após clonar e copiar para o novo projeto, executar:

1. npm install -g vsts-npm-auth
2. vsts-npm-auth -config .npmrc
3. npm publish
4. yarn (resolver dependencias)
5. yarn run dev (executar localmente)

# Modelo de Desenvolvimento

Para desenvolver corretamente com o template é necessário que algumas divisões de código sejam respeitas:

1.  Componentes
2.  Auxiliares
3.  Layout
4.  Modelos
5.  Repositorio
6.  Rotas
7.  Serviços
8.  Tema

## Componentes:

Os componentes são subdivididos em pastas com páginas e componentes próprios da Bitzar, que são reutilizáveis em outras páginas ou componentes através da passagem de parâmetros.
-Os componentes próprios não podem possuir nenhum tipo de configuração inalterável. Todos os parâmetros e exibições (exceto layout) precisam ser configuráveis na chamada do componente para permitir a reutilização.
-As páginas serão as páginas usadas no projeto, chamadas através das rotas, que precisam ser desenvolvidas utilizando temas, sem possuir definição de estilo dentro da página.

Exemplo: BitzarModal.vue - Utilizado genéricamente para ser chamado em qualquer exibição de modal.

## Auxiliares

Os auxiliares são responsáveis ajudar os serviços e telas a executarem qualquer função cuja complexidade exceda 2 linhas ou um ternário composto (Ex.: ? ( ? :) : (? :)).
Para tanto, foram subdivididos em serviços auxiliares:

1. Serviços de API: Responsável pelas chamadas na API, subdividias em chamadas anônimas ou com autenticação. Utiliza os serviços de API básicos;
1. Serviços de API Básicos: Responsável pelas chamadas de API, subdivididas em chamadas com autenticação e chamadas sem autenticação, utiliza os serviços HTTP;
1. Serviços HTTP: Responsável pela chamada básica HTTP com os parâmetros necessários para que sejam realizados;
1. Serviços de usuário: Responsável pelo armazenamento e restauração dos dados de login que ficam localizados no LocalStorage;
1. Serviços auxiliares gerais: Responsáveis por todo e qualquer método cuja lógica há alguma leve complexidade, afim de poder reutilizá-lo através de parâmetros e também quebrar mais o código em partes, diminuindo o código nos serviços de telas. Os auxiliares gerais utilizam informações já retornadas por APIs e/ou banco de dados. Ele não realiza consultas, apenas manipulações em dados ou lógicas genéricas.

Exemplo (auxiliar genérico, criado em helper.service):

```js
validateMail(email) {
    if(!email) {
        return false;
    }

    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
```

# Layout

Parte de layout reutilizável em mais de uma tela. Exemplo: Menus, Topos, Rodapés;
Exemplo: TheHeaderDropdownAccnt, que é o dropdown utilizado em todos os cabeçalhos de páginas após o login.

# Modelos

Responsável por armazenar os modelos de dados para reutilização em outros locais. Exemplos: Enumeradores pré definidos, onde não podem ser utilizadas comparações com números diretamente em componentes ou telas. Caso seja necessário comparar com algum número estático, utilizar componentes enumerados. Exemplo: send.data.operation.js.
Também é possível a criação de modelos para utilização em retorno de métodos.
Exemplo: SendDataOperation (que define as operações disponíveis no método SendData do controlador "data" da API.)

```js
const SendDataOperation = {
  None: 0,
  InsertOrUpdate: 1,
  Insert: 2,
  Update: 3,
  Delete: 4,
};
```

# Repositórios

Camada responsável pela consulta com APIs apenas.
Deve refletir os arquivos correspondendo aos controladores da API e os métodos correspondendo aos métodos do respectivo controlador na API, assim como parâmetros de consultas.

Exemplo: Método que realiza a busca de um usuário pelo seu login em repository/data.repository.js.

```js
async getUser(login) {
    const params = [
        {
            Name: 'Login',
            Value: login
        }
    ];

    const url = `${endpoints.Data_GetData}/Usuario${helper.getURLParams(params)}`;

    const result = await api.get(url);
    return result;
}
```

# Rotas

Responsável por definir as rotas internas e seus parâmetros no sistema, para redirecionamento e acesso de páginas.
Exemplo: router/index.js.

# Serviços

Camada responsável pela lógica de negócios. Utiliza o repositório para obter a informação e é dividida similarmente com as telas do sistema. Ex.: Tela de usuário possuirá um service para carregamento e alteração dos dados de usuário, de modo que seja possível ler e manipular tudo o que é necessário relacionado ao usuário.
Esta camada ainda, antes de retornar a informação à tela, realiza quaisquer operações de adaptação das informações que sejam necessárias (caso sejam necessárias) e então as retorna para as telas ou componentes para interação com o usuário final.

Exemplo: Método que realiza a busca de um usuário pelo seu login em services/user.service.js.

```js
async getUser(login) {
    try {
        const result = await dataRepository.Login(login);
        return Helper.getServiceResponse(result);
    } catch(e) {
        return {
            Code: ServiceResponseCode.CatchAPICall,
            Title: "Error",
            Message: e.message,
            Success: false,
            Warning: false
        };
    }
},
```

## Tema:

O tema deve ser utilizado para que a estilização fique toda unificada neste único arquivo, sem que cada componente use o seu. As definições de estilo devem ser especificadas de maneira reutilizável dentro do tema e organizada por tipo.

1. Exemplo de definições reutilizáveis: cor primária, cor secundária, botão primário, fundo padrão;
2. Exemplos de definições não reutilizáveis: botão azul login, botão preto normal

Exemplo prático em theme/theme.css.

```css
.primary-color {
  background-color: #4ecca3;
}
.secondary-color {
  background-color: #fff;
}
.thirdy-color {
  background-color: #34b38a;
}
```
