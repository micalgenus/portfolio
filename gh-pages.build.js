const USAGE = 'require options [prebuild] or [postbuild]';
const OPTION = (process.argv[2] || '').toLowerCase();

const fs = require('fs');
const PACKAGE = './package.json';

const GH_PAGES_HOMEPAGE = 'https://micalgenus.github.io/portfolio';
const ORIGINAL_HOMEPAGE = 'https://portfolio.micalgenus.com';

const updatePackageJson = updateJson => fs.writeFileSync(PACKAGE, JSON.stringify(updateJson, null, 2));

const prebuild = () => {
  let package = require(PACKAGE);
  package.homepage = GH_PAGES_HOMEPAGE;
  updatePackageJson(package);
};

const postbuild = () => {
  let package = require(PACKAGE);
  package.homepage = ORIGINAL_HOMEPAGE;
  updatePackageJson(package);
};

switch (OPTION) {
  case 'prebuild':
    return prebuild();
  case 'postbuild':
    return postbuild();
  default:
    throw USAGE;
}
