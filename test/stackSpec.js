import Stack from '../lib/stack';
import testData from './data/testData.json'

describe("Stack", () => {

  let connection;
  let sendToParent;
  let stack

  let sendToParentError = function () {
    return Promise.reject("sample error")
  }

  let sendToParentAjaxCallError = function () {
    return Promise.resolve({ data: "ajax error" })
  }

  beforeEach( () => {

    sendToParent = (...para) => {
      return Promise.resolve({ data: {} })
    }

    connection = { sendToParent: sendToParent }
    spyOn(connection, 'sendToParent').and.callThrough();
    stack = new Stack(testData.stack, connection)
  });

  describe("Stack Methods", () => {
    it("getData", () => {
      expect(testData.stack).toEqual(stack.getData());
    });
  });

  describe("ContentType Calls", () => {
    it("getContentType", (done) => {
      let params = { sample: 'parameter' }
      let setData = stack.getContentType('uid', params).then((data) => {
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { uid: 'uid', params, action: "getContentType" });
        done();
      });
    });

    it("getContentType uid is required", (done) => {
      let setData = stack.getContentType().catch((e) => {
        expect(e).toEqual("uid is required");
        done()
      });

    });

    it("getContentType error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getContentType('uid').catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getContentType ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getContentType('uid').catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });

    it("getContentTypes", (done) => {
      let params = { sample: 'parameter' }
      let query = { sample: 'query' }
      let setData = stack.getContentTypes(query, params).then((data) => {
        params.query = query
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { params, action: "getContentTypes" });
        done();
      });
    });

    it("getContentTypes error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getContentTypes().catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getContentTypes ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getContentTypes().catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });
  });

  describe("Entry Calls", () => {

    it("get entry with uid", (done) => {
      stack.ContentType()
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query
      .language("en_us")
      .includeReference("r1")
      .includeReference(["r2"])
      .addQuery("key","value")
      .addParam("k","v")
      .includeSchema()
      .includeContentType()
      .includeOwner()
      .fetch()
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', {"uid":"bltasssss","content_type_uid":"blog","params":{"locale":"en_us","include":["r1","r2"],"key":"value","k":"v","include_schema":true,"include_content_type":true,"include_owner":true},"action":"getEntry"});
          done();
        });
    });

    it("get entry with uid, Kindly provide an entry uid", (done) => {
      stack.ContentType('blog').Entry().fetch().catch(e=> {
        expect(e).toEqual("Kindly provide an entry uid. e.g. .Entry('bltsomething123')")
        done()
      })     
    });

    it("get entry with uid, addParam error", (done) => {
      try {
       stack.ContentType('blog').Entry().addParam()
      } catch(e) {
        expect(e.message).toEqual("Kindly provide valid parameters.")
        done()
      }
    });

    it("get entry with uid, addQuery error", (done) => {
      try {
       stack.ContentType('blog').Entry().addQuery()
      } catch(e) {
        expect(e.message).toEqual("First argument should be a String.")
        done()
      }
    });

    it("get entry with uid, language error.", (done) => {
      try {
       stack.ContentType('blog').Entry().language()
      } catch(e) {
        expect(e.message).toEqual("Argument should be a String.")
        done()
      }
    });

    it("get entry with uid, includeReference error", (done) => {
      try {
       stack.ContentType('blog').Entry().includeReference(["stack"]).includeReference()
      } catch(e) {
        expect(e.message).toEqual("Argument should be a String or an Array.")
        done()
      }
    });

    it("entry only", (done) => {
      const entry = stack.ContentType('newblog').Entry("xys");
      entry.only('title')
      entry.only('BASE','title')
      entry.only(['deatials', 'sample'])
      entry.fetch()
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{"uid":"xys","content_type_uid":"newblog","params":{"only":{"BASE":["title","title","deatials","sample"]}},"action":"getEntry"});
          done();
        });
      done()
    });

    it("entry except", (done) => {
      const entry = stack.ContentType('newblog').Entry("xys");
      entry.except('title',[])
      entry.except('BASE','title')
      entry.except(['deatials', 'sample'])
      entry.fetch()
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{"uid":"xys","content_type_uid":"newblog","params":{"except":{"title":[],"BASE":["title","deatials","sample"]}},"action":"getEntry"});
          done();
        });
      done()
    });

    it("entry only failure cases", (done) => {
      const entry = stack.ContentType('newblog').Entry("xys");
      entry.except("test",[])
      try {
          entry.only()
      } catch(e) {
        expect(e.message).toEqual('Kindly provide valid parameters');
      }
      try {
          entry.only({})
      } catch(e) {
        expect(e.message).toEqual('Kindly provide valid parameters');
      }

      try {
          entry.only({},{})
      } catch(e) {
        expect(e.message).toEqual('Kindly provide valid parameters');
      }
      
      done()
    });

    it("entry except failure cases", (done) => {
      const entry = stack.ContentType('newblog').Entry("xys");
      try {
          entry.except()
      } catch(e) {
        expect(e.message).toEqual('Kindly provide valid parameters');
      }
      try {
          entry.except({})
      } catch(e) {
        expect(e.message).toEqual('Kindly provide valid parameters');
      }

      try {
          entry.except({},{})
      } catch(e) {
        expect(e.message).toEqual('Kindly provide valid parameters');
      }
      
      done()
    });

    it("find entry query", (done) => {
       const Query = stack.ContentType('newblog').Query();
       expect(Query.getQuery()).toEqual({});
       Query
       .query({"l":"c"})
       .tags(["k"])
       .includeCount()
       .addParam("x1","y")
       .equalTo("x2","y")
       .where("x3","y")
       .regex("k1","v",{})
       .search("search")
       .lessThan("k2","v")
       .lessThanOrEqualTo("k3","v")
       .greaterThan("k4","v")
       .greaterThanOrEqualTo("k5","v")
       .notEqualTo("k6","v")
       .containedIn("k7",["v"])
       .notContainedIn("k7",["v"])
       .exists("k8")
       .ascending("k9")
       .descending("k10")
       .beforeUid("k11")
       .afterUid("k12")
       .skip(100)
       .limit(100)
       .and({})
       .or({})
       expect(Query.getQuery()).toEqual({"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]})
       Query.find().then((data) =>{
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{"content_type_uid":"newblog","params":{"query":{"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]},"tags":["k"],"include_count":true,"x1":"y","typeahead":"search","asc":"k9","desc":"k10","before_uid":"k11","after_uid":"k12","skip":100,"limit":100},"action":"getEntries"});
          done()
       });
    });

    it("find one entry", (done) => {
       const Query = stack.ContentType('newblog').Query();
       expect(Query.getQuery()).toEqual({});
       Query
       .query({"l":"c"})
       .tags(["k"])
       .includeCount()
       .addParam("x1","y")
       .equalTo("x2","y")
       .where("x3","y")
       .regex("k1","v",{})
       .search("search")
       .lessThan("k2","v")
       .lessThanOrEqualTo("k3","v")
       .greaterThan("k4","v")
       .greaterThanOrEqualTo("k5","v")
       .notEqualTo("k6","v")
       .containedIn("k7",["v"])
       .notContainedIn("k7",["v"])
       .exists("k8")
       .ascending("k9")
       .descending("k10")
       .beforeUid("k11")
       .afterUid("k12")
       .skip(100)
       .limit(100)
       .and({})
       .or({})
       expect(Query.getQuery()).toEqual({"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]})
       Query.findOne().then((data) =>{
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{"content_type_uid":"newblog","params":{"query":{"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]},"tags":["k"],"include_count":true,"x1":"y","typeahead":"search","asc":"k9","desc":"k10","before_uid":"k11","after_uid":"k12","skip":100,"limit":1},"action":"getEntries"});
          done()
       });
    });

    it("and query", (done) => {

      const Query = stack.ContentType('newblog').Query();
      let Query1 = stack.ContentType('blog').Query().where('title', 'Demo')
      let Query2 = stack.ContentType('blog').Query().lessThan('comments', 10)
      Query.and(Query1, Query2)
       expect(Query.getQuery()).toEqual({"$and":[{"title":"Demo"},{"comments":{"$lt":10}}]})
       Query.findOne().then((data) =>{
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{"content_type_uid":"newblog","params":{"query":{"$and":[{"title":"Demo"},{"comments":{"$lt":10}}]},"limit":1},"action":"getEntries"});
          let newQuery = Query.and('new', 'Demo');
          expect(Query.getQuery()).toEqual({"$and":[{"title":"Demo"},{"comments":{"$lt":10}}]})
          done()
       });
    });

    it("or query", (done) => {
       const Query = stack.ContentType('newblog').Query();
       let Query1 = stack.ContentType('blog').Query().where('title', 'Demo')
      let Query2 = stack.ContentType('blog').Query().lessThan('comments', 10)
      Query.or(Query1, Query2)
       expect(Query.getQuery()).toEqual({"$or":[{"title":"Demo"},{"comments":{"$lt":10}}]})
       Query.findOne().then((data) =>{
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{"content_type_uid":"newblog","params":{"query":{"$or":[{"title":"Demo"},{"comments":{"$lt":10}}]},"limit":1},"action":"getEntries"});
          done()
       });
    });

    it("count entries", (done) => {
       const Query = stack.ContentType('newblog').Query();
       expect(Query.getQuery()).toEqual({});
       Query
       .query({"l":"c"})
       .tags(["k"])
       .includeCount()
       .addParam("x1","y")
       .equalTo("x2","y")
       .where("x3","y")
       .regex("k1","v",{})
       .regex("k13","v")
       .search("search")
       .lessThan("k2","v")
       .lessThanOrEqualTo("k3","v")
       .greaterThan("k4","v")
       .greaterThanOrEqualTo("k5","v")
       .notEqualTo("k6","v")
       .containedIn("k7",["v"])
       .notContainedIn("k7",["v"])
       .exists("k8")
       .ascending("k9")
       .descending("k10")
       .beforeUid("k11")
       .afterUid("k12")
       .skip(100)
       .limit(100)
       .and({})
       .or({})
       expect(Query.getQuery()).toEqual({"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k13":{"$regex":"v"},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]})
       Query.count().then((data) =>{
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{"content_type_uid":"newblog","params":{"query":{"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k13":{"$regex":"v"},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]},"tags":["k"],"include_count":true,"x1":"y","typeahead":"search","asc":"k9","desc":"k10","before_uid":"k11","after_uid":"k12","skip":100,"limit":100,"count":true},"action":"getEntries"});
          done()
       });
    });

    it("query error cases", (done) => {
       const Query = stack.ContentType('newblog').Query();
       try { 
          Query.query() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters")
        }
        try { 
          Query.tags() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters")
        }
        try { 
          Query.addParam() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.equalTo() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.where() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.regex() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.search() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.lessThan() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.lessThanOrEqualTo() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.greaterThan() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.greaterThanOrEqualTo() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.notEqualTo() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.containedIn() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.notContainedIn() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.exists() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.ascending() 
        } catch (e) {
          expect(e.message).toEqual("Argument should be a string.")
        }
        try { 
          Query.descending() 
        } catch (e) {
          expect(e.message).toEqual("Argument should be a string.")
        }
        try { 
          Query.beforeUid() 
        } catch (e) {
          expect(e.message).toEqual("Argument should be a string.")
        }
        try { 
          Query.afterUid() 
        } catch (e) {
          expect(e.message).toEqual("Argument should be a string.")
        }
        try { 
          Query.skip() 
        } catch (e) {
          expect(e.message).toEqual("Argument should be a number.")
        }
        try { 
          Query.limit() 
        } catch (e) {
          expect(e.message).toEqual("Argument should be a number.")
        }
        try { 
          Query.and() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
        try { 
          Query.or() 
        } catch (e) {
          expect(e.message).toEqual("Kindly provide valid parameters.")
        }
       done();
    });

    it("find entry query, includeReference error", (done) => {
      try {
       stack.ContentType('blog').Entry().includeReference(["stack"]).includeReference()
      } catch(e) {
        expect(e.message).toEqual("Argument should be a String or an Array.")
        done()
      }
    });

    it("query find ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.ContentType('blog').Query().find().catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });

    it("get entry with uid ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.ContentType('blog').Entry('uid').fetch().catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });
  });

  describe("Environment Calls", () => {
    it("getEnvironment", (done) => {
      let params = { sample: 'parameter' }
      let setData = stack.getEnvironment('uid', params).then((data) => {
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { name: 'uid', params, action: "getEnvironment" });
        done();
      });
    });

    it("getEnvironment name is required", (done) => {
      let setData = stack.getEnvironment().catch((e) => {
        expect(e).toEqual("name is required");
        done()
      });

    });

    it("getEnvironment error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getEnvironment('uid').catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getEnvironment ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getEnvironment('uid').catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });

    it("getEnvironments", (done) => {
      let params = { sample: 'parameter' }
      let query = { sample: 'query' }
      let setData = stack.getEnvironments(query, params).then((data) => {
        params.query = query
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { params, action: "getEnvironments" });
        done();
      });
    });

    it("getEnvironments error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getEnvironments().catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getEnvironments ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getEnvironments().catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });
  });



  describe("Assets Calls", () => {

    it("get single asset", (done) => {
      const Query = stack.Assets("bltasssss").addParam('k','v')
      Query.fetch()
        .then((data) => {
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { uid: 'bltasssss', params: { k: 'v' }, action: 'getAsset' });
          expect(data).toEqual({});
          done();
        });
    });

    // it("get single asset, Kindly provide an asset uid", (done) => {
    //   console.log('1111')
    //   stack.Assets().fetch().catch(e=> {
    //     expect(e).toEqual("Kindly provide an asset uid. e.g. .Assets('bltsomething123')")
    //     done()
    //   })     
    // });

    it("get entry with uid, addParam error", (done) => {
      try {
       stack.Assets('blog').addParam()
      } catch(e) {
        expect(e.message).toEqual("Kindly provide valid parameters.")
        done()
      }
    });

    it("getAssets ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.Assets("bltasssss").fetch().catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });

    it("find assets query", (done) => {
       stack.Assets()
       const Query = stack.Query();
       expect(Query.getQuery()).toEqual({});
       Query
       .query({"l":"c"})
       .tags(["k"])
       .includeCount()
       .addParam("x1","y")
       .equalTo("x2","y")
       .where("x3","y")
       .regex("k1","v",{})
       .search("search")
       .lessThan("k2","v")
       .lessThanOrEqualTo("k3","v")
       .greaterThan("k4","v")
       .greaterThanOrEqualTo("k5","v")
       .notEqualTo("k6","v")
       .containedIn("k7",["v"])
       .notContainedIn("k7",["v"])
       .exists("k8")
       .ascending("k9")
       .descending("k10")
       .beforeUid("k11")
       .afterUid("k12")
       .skip(100)
       .limit(100)
       .and({})
       .or({})
       expect(Query.getQuery()).toEqual({"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]})
       Query.find().then((data) =>{
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{content_type_uid: undefined, "params":{"query":{"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]},"tags":["k"],"include_count":true,"x1":"y","typeahead":"search","asc":"k9","desc":"k10","before_uid":"k11","after_uid":"k12","skip":100,"limit":100},"action":"getAssets"});
          done()
       });
    });

    it("find one asset", (done) => {
      stack.Assets()
       const Query = stack.Query();
       expect(Query.getQuery()).toEqual({});
       Query
       .query({"l":"c"})
       .tags(["k"])
       .includeCount()
       .addParam("x1","y")
       .equalTo("x2","y")
       .where("x3","y")
       .regex("k1","v",{})
       .search("search")
       .lessThan("k2","v")
       .lessThanOrEqualTo("k3","v")
       .greaterThan("k4","v")
       .greaterThanOrEqualTo("k5","v")
       .notEqualTo("k6","v")
       .containedIn("k7",["v"])
       .notContainedIn("k7",["v"])
       .exists("k8")
       .ascending("k9")
       .descending("k10")
       .beforeUid("k11")
       .afterUid("k12")
       .skip(100)
       .limit(100)
       .and({})
       .or({})
       expect(Query.getQuery()).toEqual({"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]})
       Query.findOne().then((data) =>{
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{content_type_uid: undefined,"params":{"query":{"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]},"tags":["k"],"include_count":true,"x1":"y","typeahead":"search","asc":"k9","desc":"k10","before_uid":"k11","after_uid":"k12","skip":100,"limit":1},"action":"getAssets"});
          done()
       });
    });

    it("count assets", (done) => {
      stack.Assets()
       const Query = stack.Query();
       expect(Query.getQuery()).toEqual({});
       Query
       .query({"l":"c"})
       .tags(["k"])
       .includeCount()
       .addParam("x1","y")
       .equalTo("x2","y")
       .where("x3","y")
       .regex("k1","v",{})
       .search("search")
       .lessThan("k2","v")
       .lessThanOrEqualTo("k3","v")
       .greaterThan("k4","v")
       .greaterThanOrEqualTo("k5","v")
       .notEqualTo("k6","v")
       .containedIn("k7",["v"])
       .notContainedIn("k7",["v"])
       .exists("k8")
       .ascending("k9")
       .descending("k10")
       .beforeUid("k11")
       .afterUid("k12")
       .skip(100)
       .limit(100)
       .and({})
       .or({})
       expect(Query.getQuery()).toEqual({"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]})
       Query.count().then((data) =>{
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{content_type_uid: undefined, "params":{"query":{"l":"c","x2":"y","x3":"y","k1":{"$regex":"v","$options":{}},"k2":{"$lt":"v"},"k3":{"$lte":"v"},"k4":{"$gt":"v"},"k5":{"$gte":"v"},"k6":{"$ne":"v"},"k7":{"$in":["v"],"$nin":["v"]},"k8":{"$exists":true},"$and":[{}],"$or":[{}]},"tags":["k"],"include_count":true,"x1":"y","typeahead":"search","asc":"k9","desc":"k10","before_uid":"k11","after_uid":"k12","skip":100,"limit":100,"count":true},"action":"getAssets"});
          done()
       });
    });
  });



  describe("Locale Calls", () => {
    it("getLocale", (done) => {
      let params = { sample: 'parameter' }
      let setData = stack.getLocale('uid', params).then((data) => {
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { code: 'uid', params, action: "getLocale" });
        done();
      });
    });

    it("getLocale code is required", (done) => {
      let setData = stack.getLocale().catch((e) => {
        expect(e).toEqual("code is required");
        done()
      });

    });

    it("getLocale error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getLocale('uid').catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getLocale ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getLocale('uid').catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });

    it("getLocales", (done) => {
      let params = { sample: 'parameter' }
      let query = { sample: 'query' }
      let setData = stack.getLocales(query, params).then((data) => {
        params.query = query
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { params, action: "getLocales" });
        done();
      });
    });

    it("getLocales error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getLocales().catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getLocales ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getLocales().catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });
  });
});