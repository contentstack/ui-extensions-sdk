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
        expect(e.message).toEqual("uid is required");
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
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', {"uid":"bltasssss","content_type_uid":"blog","params":{"locale":"en_us","include[]":["r1","r2"],"key":"value","k":"v","include_schema":true,"include_content_type":true,"include_owner":true},"action":"getEntry"});
          done();
        });
    });

    it("get entry with uid, uid is required", (done) => {
      try{
         stack.ContentType('blog').Entry()
      }catch(e) {
        expect(e.message).toEqual("uid is required")
        done()
      }
    });

    it("get entry with uid, addParam error", (done) => {
      try {
       stack.ContentType('blog').Entry('entry_uid').addParam()
      } catch(e) {
        expect(e.message).toEqual("Kindly provide valid parameters.")
        done()
      }
    });

    it("get entry with uid, addQuery error", (done) => {
      try {
       stack.ContentType('blog').Entry('entry_uid').addQuery()
      } catch(e) {
        expect(e.message).toEqual("First argument should be a String.")
        done()
      }
    });

    it("entries query, addQuery error", (done) => {
      try {
       stack.ContentType('blog').Entry.Query().addQuery()
      } catch(e) {
        expect(e.message).toEqual("First argument should be a String.")
        done()
      }
    });

    it("get entry with uid, language error.", (done) => {
      try {
       stack.ContentType('blog').Entry('entry_uid').language()
      } catch(e) {
        expect(e.message).toEqual("Argument should be a String.")
        done()
      }
    });

     it("query entries, language error.", (done) => {
      try {
       stack.ContentType('blog').Entry.Query().language()
      } catch(e) {
        expect(e.message).toEqual("Argument should be a String.")
        done()
      }
    });


    it("get entry with uid, includeReference error", (done) => {
      try {
       stack.ContentType('blog').Entry('entry_uid').includeReference(["stack"]).includeReference()
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
       const Query = stack.ContentType('newblog').Entry.Query();
       expect(Query.getQuery()).toEqual({});
       Query
       .query({"l":"c"})
       .tags(["k"])
       .includeCount()
       .addParam("x1","y")
       .addQuery("zz","aa")
       .equalTo("x2","y")
       .where("x3","y")
       .language("en_us")
       .environment("development")
       .includeReference("r1")
       .includeReference(["r2"])
       .includeOwner()
       .includeSchema()
       .includeContentType()
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
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', Object({ content_type_uid: 'newblog', params: Object({ query: Object({ l: 'c', x2: 'y', x3: 'y', k1: Object({ $regex: 'v', $options: Object({  }) }), k2: Object({ $lt: 'v' }), k3: Object({ $lte: 'v' }), k4: Object({ $gt: 'v' }), k5: Object({ $gte: 'v' }), k6: Object({ $ne: 'v' }), k7: Object({ $in: [ 'v' ], $nin: [ 'v' ] }), k8: Object({ $exists: true }), $and: [ Object({  }) ], $or: [ Object({  }) ] }), tags: [ 'k' ], include_count: true, x1: 'y', zz: 'aa', locale: 'en_us', environment: 'development', "include[]": [ 'r1', 'r2' ], include_owner: true, include_schema: true, include_content_type: true, typeahead: 'search', asc: 'k9', desc: 'k10', before_uid: 'k11', after_uid: 'k12', skip: 100, limit: 100 }), action: 'getEntries' }));
          done()
       });
    });

    it("find one entry", (done) => {
       const Query = stack.ContentType('newblog').Entry.Query();
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

      const Query = stack.ContentType('newblog').Entry.Query();
      let Query1 = stack.ContentType('blog').Entry.Query().where('title', 'Demo')
      let Query2 = stack.ContentType('blog').Entry.Query().lessThan('comments', 10)
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
       const Query = stack.ContentType('newblog').Entry.Query();
       let Query1 = stack.ContentType('blog').Entry.Query().where('title', 'Demo')
      let Query2 = stack.ContentType('blog').Entry.Query().lessThan('comments', 10)
      Query.or(Query1, Query2)
       expect(Query.getQuery()).toEqual({"$or":[{"title":"Demo"},{"comments":{"$lt":10}}]})
       Query.findOne().then((data) =>{
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith("stackQuery",{"content_type_uid":"newblog","params":{"query":{"$or":[{"title":"Demo"},{"comments":{"$lt":10}}]},"limit":1},"action":"getEntries"});
          done()
       });
    });

    it("count entries", (done) => {
       const Query = stack.ContentType('newblog').Entry.Query();
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
       const Query = stack.ContentType('newblog').Entry.Query();
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
       stack.ContentType('blog').Entry('entry_uid').includeReference(["stack"]).includeReference()
      } catch(e) {
        expect(e.message).toEqual("Argument should be a String or an Array.")
        done()
      }
    });

    it("query entries, includeReference error", (done) => {
      try {
       stack.ContentType('blog').Entry.Query().includeReference(["stack"]).includeReference()
      } catch(e) {
        expect(e.message).toEqual("Argument should be a String or an Array.")
        done()
      }
    });

    it("query entries, environment error", (done) => {
      try {
       stack.ContentType('blog').Entry.Query().environment()
      } catch(e) {
        expect(e.message).toEqual("Argument should be a String.")
        done()
      }
    });

    it("query find ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.ContentType('blog').Entry.Query().find().catch((e) => {
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

    it("getLanguages", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.getLanguages()
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', Object({ content_type_uid: 'blog', uid: 'bltasssss', params: Object({  }), action: 'getEntryLanguages' }));
          done();
        });
    });


     it("create an entry", (done) => {
      const Query = stack.ContentType('blog').Entry      
      Query.create({sample :"payload"})
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', Object({ payload: Object({ sample: 'payload' }), content_type_uid: 'blog', action: 'createEntry' }));
          done();
        });
    });

    it("unlocalize entry", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.unlocalize('uid')
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith( 'stackQuery', Object({ content_type_uid: 'blog', uid: 'bltasssss', params: Object({ locale: 'uid' }), action: 'unlocalizeEntry' }));
          done();
        });
    });

    it("unlocalize entry invalid parameters", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.unlocalize()
        .catch((e) => {
          expect(e.message).toEqual("Kindly provide valid parameters")
          done();
        });
    });

    it("publish entry", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.publish({sample :"payload"})
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith(  'stackQuery', Object({ payload: Object({ sample: 'payload' }), content_type_uid: 'blog', uid: 'bltasssss', params: Object({  }), action: 'publishEntry' }));
          done();
        });
    });

    it("publish entry invalid parameters", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.publish()
        .catch((e) => {
          expect(e.message).toEqual('Kindly provide valid parameters')
          done();
        });
    });

     it("unpublish entry", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.unpublish({sample :"payload"})
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith(  'stackQuery', Object({ payload: Object({ sample: 'payload' }), content_type_uid: 'blog', uid: 'bltasssss', params: Object({  }), action: 'unpublishEntry' }));
          done();
        });
    });

    it("unpublish entry invalid parameters", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.unpublish()
        .catch((e) => {
          expect(e.message).toEqual('Kindly provide valid parameters')
          done();
        });
    });

     it("set workflow stage for an entry", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.setWorkflowStage({sample :"payload"})
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith(  'stackQuery', Object({ payload: Object({ sample: 'payload' }), content_type_uid: 'blog', uid: 'bltasssss', params: Object({  }), action: 'setWorkflowStageEntry' }));
          done();
        });
    });

    it("set workflow stage invalid parameters", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.setWorkflowStage()
        .catch((e) => {
          expect(e.message).toEqual('Kindly provide valid parameters')
          done();
        });
    });

     it("update an entry", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.update({sample :"payload"}, "fr-fr")
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith( 'stackQuery', Object({ payload: Object({ sample: 'payload' }), content_type_uid: 'blog', uid: 'bltasssss', params: Object({ locale: "fr-fr" }), action: 'updateEntry' }) );
          done();
        });
    });

    it("update entry invalid parameters", (done) => {
      const Query = stack.ContentType('blog').Entry("bltasssss")
      Query.update()
        .catch((e) => {
          expect(e.message).toEqual('Kindly provide valid parameters')
          done();
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
        expect(e.message).toEqual("name is required");
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
      const Query = stack.Asset("bltasssss").addParam('kz','zz')
      Query.fetch()
        .then((data) => {
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { uid: 'bltasssss', params: { kz: 'zz' }, action: 'getAsset' });
          expect(data).toEqual({});
          done();
        });
    });

    // it("get single asset, Kindly provide an asset uid", (done) => {
    //   console.log('1111')
    //   stack.Asset().fetch().catch(e=> {
    //     expect(e).toEqual("Kindly provide an asset uid. e.g. .Asset('bltsomething123')")
    //     done()
    //   })     
    // });

    it("get asset with uid, addParam error", (done) => {
      try {
       stack.Asset('blog').addParam()
      } catch(e) {
        expect(e.message).toEqual("Kindly provide valid parameters.")
        done()
      }
    });

    it("getAssets ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.Asset("bltasssss").fetch().catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });

    it("find assets query", (done) => {
       const Query = stack.Asset.Query();
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
       const Query = stack.Asset.Query();
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
       const Query = stack.Asset.Query();
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

     it("getRteAssets", (done) => {
      const Query = stack.Asset
      Query.getRteAssets()
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', Object({ action: 'getRteAssets' }));
          done();
        });
    });

    it("getAssetsOfSpecificTypes", (done) => {
      const Query = stack.Asset
      Query.getAssetsOfSpecificTypes('image/png')
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', Object({ action: 'getAssetsOfSpecificTypes', asset_type: 'image/png' }));
          done();
        });
    });

    it("getAssetsOfSpecificTypes invalid parameters", (done) => {
      const Query = stack.Asset
      Query.getAssetsOfSpecificTypes()
        .catch((e) => {
          expect(e.message).toEqual('Kindly provide valid parameters')
          done();
        });
    });

    it("getAssetsOfSpecificTypes error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.Asset.getAssetsOfSpecificTypes('uid').catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });

    it("get references of an asset", (done) => {
      const Query = stack.Asset("bltasssss")
      Query.getReferences()
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith( 'stackQuery', Object({ uid: 'bltasssss', params: Object({  }), action: 'getAssetReferences' }));
          done();
        });
    });


    it("publish asset", (done) => {
      const Query = stack.Asset("bltasssss")
      Query.publish({sample :"payload"})
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', Object({ payload: Object({ sample: 'payload' }), uid: 'bltasssss', params: Object({  }), action: 'publishAsset' }));
          done();
        });
    });

    it("publish asset invalid parameters", (done) => {
      const Query = stack.Asset("bltasssss")
      Query.publish()
        .catch((e) => {
          expect(e.message).toEqual('Kindly provide valid parameters')
          done();
        });
    });

     it("unpublish asset", (done) => {
      const Query = stack.Asset("bltasssss")
      Query.unpublish({sample :"payload"})
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith( 'stackQuery', Object({ payload: Object({ sample: 'payload' }), uid: 'bltasssss', params: Object({  }), action: 'unpublishAsset' }));
          done();
        });
    });

    it("unpublish asset invalid parameters", (done) => {
      const Query = stack.Asset("bltasssss")
      Query.unpublish()
        .catch((e) => {
          expect(e.message).toEqual('Kindly provide valid parameters')
          done();
        });
    });

   it("update an asset", (done) => {
      const Query = stack.Asset("bltasssss")
      Query.update({sample :"payload"})
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith( 'stackQuery', Object({ payload: Object({ sample: 'payload' }), uid: 'bltasssss', params: Object({  }), action: 'updateAsset' }));
          done();
        });
    });

    it("update asset invalid parameters", (done) => {
      const Query = stack.Asset("bltasssss")
      Query.update()
        .catch((e) => {
          expect(e.message).toEqual('Kindly provide valid parameters')
          done();
        });
    });

    it("delete an asset", (done) => {
      const Query = stack.Asset("bltasssss")
      Query.delete({sample :"payload"})
        .then((data) => {
          expect(data).toEqual({});
          expect(connection.sendToParent).toHaveBeenCalledWith(  'stackQuery', Object({ uid: 'bltasssss', params: Object({  }), action: 'deleteAsset' }) );
          done();
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
        expect(e.message).toEqual("code is required");
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