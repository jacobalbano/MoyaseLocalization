import { map } from 'lodash';

// automatically imports all the modules and exports as a single module object
const requireModule = require.context('.', false,  /\.json$/);
export default map(requireModule.keys(), filename =>
    requireModule(filename).default || requireModule(filename)
);