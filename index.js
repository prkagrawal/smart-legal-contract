const Template = require('@accordproject/cicero-core').Template;
const Engine = require('@accordproject/cicero-engine').Engine;

const template = await Template.fromDirectory('./contract');

// load the DSL text for the template
const testLatePenaltyInput = fs.readFileSync(path.resolve(__dirname, 'data/', 'sample.txt'), 'utf8');

const clause = new Clause(template);
clause.parse(testLatePenaltyInput);

// get the JSON object created from the parse
const data = clause.getData();


// Send a request to the contract
// You can then call execute on it, passing in the clause or contract instance, and the request:
const request = {
    '$class': 'org.accordproject.latedeliveryandpenalty.LateDeliveryAndPenaltyRequest',
    'forceMajeure': false,
    'agreedDelivery': '2017-10-07T16:38:01.412Z',
    'goodsValue': 200,
    'transactionId': '402c8f50-9e61-433e-a7c1-afe61c06ef00',
    'timestamp': '2017-11-12T17:38:01.412Z'
};
const state = {};
state.$class = 'org.accordproject.cicero.contract.AccordContractState';
state.stateId = 'org.accordproject.cicero.contract.AccordContractState#1';
const result = await Engine.execute(clause, request, state);