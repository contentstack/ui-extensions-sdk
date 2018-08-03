import Stack from '../lib/stack.js';
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

  beforeEach(function () {

    sendToParent = function () {
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

    it("getEntry", (done) => {
      let params = { sample: 'parameter' }
      let setData = stack.getEntry('uid', 'ct_uid', params).then((data) => {
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { uid: 'uid', content_type_uid: 'ct_uid', params, action: "getEntry" });
        done();
      });
    });

    it("getEntry uid is required", (done) => {
      let setData = stack.getEntry().catch((e) => {
        expect(e).toEqual("uid is required");
        done()
      });
    });

    it("getEntry content_type_uid is required", (done) => {
      let setData = stack.getEntry('uid').catch((e) => {
        expect(e).toEqual("content_type_uid is required");
        done()
      });
    });

    it("getEntry error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getEntry('uid', 'ct_uid').catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getEntry ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getEntry('uid', 'ct_uid').catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });

    it("getEntries", (done) => {
      let params = { sample: 'parameter' }
      let query = { sample: 'query' }
      let setData = stack.getEntries('ct_uid', query, params).then((data) => {
        params.query = query
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { content_type_uid: 'ct_uid', params, action: "getEntries" });
        done();
      });
    });

    it("getEntries content_type_uid is required", (done) => {
      let setData = stack.getEntries().catch((e) => {
        expect(e).toEqual("content_type_uid is required");
        done()
      });
    });

    it("getEntries error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getEntries('ct_uid').catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getEntries ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getEntries('ct_uid').catch((e) => {
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
    it("getAsset", (done) => {
      let params = { sample: 'parameter' }
      let setData = stack.getAsset('uid', params).then((data) => {
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { uid: 'uid', params, action: "getAsset" });
        done();
      });
    });

    it("getAsset uid is required", (done) => {
      let setData = stack.getAsset().catch((e) => {
        expect(e).toEqual("uid is required");
        done()
      });

    });

    it("getAsset error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getAsset('uid').catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getAsset ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getAsset('uid').catch((e) => {
        expect(e).toEqual("ajax error");
        done()
      });
    });

    it("getAssets", (done) => {
      let params = { sample: 'parameter' }
      let query = { sample: 'query' }
      let setData = stack.getAssets(query, params).then((data) => {
        params.query = query
        expect(data).toEqual({});
        expect(connection.sendToParent).toHaveBeenCalledWith('stackQuery', { params, action: "getAssets" });
        done();
      });
    });

    it("getAssets error case", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentError })
      newStack.getAssets().catch((e) => {
        expect(e).toEqual("sample error");
        done()
      });
    });

    it("getAssets ajax error", (done) => {
      let newStack = new Stack({ data: testData }, { sendToParent: sendToParentAjaxCallError })
      newStack.getAssets().catch((e) => {
        expect(e).toEqual("ajax error");
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