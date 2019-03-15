const Candidate = require('./models').Candidate;
const Position = require('./models').Position;
Candidate.find().populate('position', 'title').select('name _id votes position').exec().then(docs => console.log(docs));
