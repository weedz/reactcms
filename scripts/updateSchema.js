const fs =  require('fs');
const path = require('path');
const { graphql } = require('graphql');
const { introspectionQuery, printSchema } = require('graphql/utilities');

// Assume your schema is in ../data/schema
const schema = require('../server/schema');
const yourSchemaPath = path.join(__dirname,'..','schema');

// Save JSON of full schema introspection for Babel Relay Plugin to use
graphql(schema, introspectionQuery).then(result => {
    fs.writeFileSync(
        `${yourSchemaPath}.json`,
        JSON.stringify(result, null, 2)
    );
});

// Save user readable type system shorthand of schema
fs.writeFileSync(
    `${yourSchemaPath}.graphql`,
    printSchema(schema)
);