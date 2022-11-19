# Issue Tracker

Issue Tracker is a web based general purpose tool used to track bugs and feature requests during project development. It aims to be simple and easy to use.

## Getting Started

Ensure that `MySQS` is installed in your machine and create a user named `dotnet` identified with `dotnet`, make sure to grant all privileges so that Entity Framework Core can create the database properly.

### Install the client project dependencies

```
npm install --prefix ./src/WebUI/ClientApp
```

### Update your database to the last migration

```
dotnet ef database update -p ./src/Infrastructure/Infrastructure.csproj -s ./src/WebUI/WebUI.csproj
```

### Run the application

`dotnet watch run -p .\src\WebUI\WebUI.csproj`

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License.