<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/malang-dev/template-deno">
    <img src="https://www.svgrepo.com/show/303600/typescript-logo.svg" alt="Typescript" width="150px">
  </a>
  <h2 align="center">@malang-dev/template-deno</h2>
  <div align="center">
    <p align="center">Template repository for new Deno projects</p>
    <div>
        <a href="https://github.com/malang-dev/template-deno/releases/"><img src="https://img.shields.io/github/release/malang-dev/template-deno?include_prereleases=&sort=semver&color=blue" alt="GitHub release"></a>
        <a href="https://github.com/malang-dev/template-deno#license"><img src="https://img.shields.io/badge/License-MIT-blue" alt="License"></a>
    </div>
  </div>
</div>

## Installation & Usage

1. Create a new repository by clicking the `Use this template` button.
2. Fill in the repository name and description, then click the `Create Repository button`.
3. Clone the created repository.
4. Install dependencies by running:
   ```
   yarn install
   ```
5. Done, Happy coding!!!.

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Releasing

### For first time setup
1. Make sure you have deno deploy account [https://deno.com/deploy](https://deno.com/deploy)
2. Create new project, after that goto project setting and Link the project to github repostitory
3. Don't forget to check `Just link the repo, I’ll set up GitHub Actions myself`, and then click create project button
4. Ignore it, if asks for empty commit
5. Change the project name in [deno-deploy.yaml](https://github.com/malang-dev/template-deno/blob/master/.github/workflows/deno-deploy.yaml#L44)

### After first time setup / second time deploy
6. Go to [Publish Release](https://github.com/malang-dev/template-deno/actions/workflows/publish-release.yaml) page, click Run workflow
7. Fill the vendor version and then run the flow
8. GitHub Actions will take care of the rest

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/malang-dev/template-deno/blob/master/LICENSE.md) file for details.

## Acknowledgments

Inspiration, code snippets, icon, etc.

- [Template Typescript](https://github.com/foxglove/template-typescript) by Foxglove.
