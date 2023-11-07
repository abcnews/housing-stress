# housing-stress

Code and data for an ABC News story on housing stress.

## Data

Data for this project is managed with [DVC](https://dvc.org/) and stored in the `data-library` Sharepoint group [synced to OneDrive](https://support.microsoft.com/en-us/office/sync-sharepoint-files-and-folders-87a96948-4dd7-43e4-aca1-53f3e18bea9b).

Once DVC is installed and the data-library files are syned to your OneDrive, getting project data should be as simple as running `dvc pull` in the project directory;

## Development

```bash
git clone git@github.com:abcnews/housing-stress.git
cd housing-stress
npm i
npm run dev
```

### Deployment

Deployment is done via the usual [aunty](https://github.com/abcnews/aunty) methods.

This project was generated from [aunty](https://github.com/abcnews/aunty)'s `svelte` project template.
