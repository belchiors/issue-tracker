# Issue Tracker

Issue Tracker is a web based general purpose tool used to track bugs and feature requests during project development. It aims to be simple and easy to use.

## Getting Started

Ensure that `MySQL` is installed in your machine and create a user named `dotnet` identified with `dotnet`, make sure to grant all privileges so that Entity Framework Core can create the database properly.

You can use your own connection string instead of the default connection string used for testing. To acomplish that, you need to set `ASPNETCORE_ENVIRONMENT` environment variable to `Production`, and `DATABASE_URL` environment variable with the desired connection string.

Be aware that in production environment, it's mandatory to set `JWTSecurityKey` environment variable with a hash using Sha256 signature, so that the application can make use of JWT authentication.

### Install the client project dependencies

```
npm install --prefix ./src/WebUI/ClientApp
```

### Create database schema and apply migrations

```
dotnet ef database update --project ./src/Infrastructure/Infrastructure.csproj --startup-project ./src/WebUI/WebUI.csproj
```

### Run the application

`dotnet watch run --project .\src\WebUI\WebUI.csproj`

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License.