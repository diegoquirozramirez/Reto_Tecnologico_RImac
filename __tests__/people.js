'use strict';
const md5 = require('md5');
const handler = require('../src/handler');
const callback = () => {return {id: 1, post: 'Post test'}}

describe('people', () => {
  it('implement tests here', () => {
    let body = {pathParameters: {id: md5(15)}} // 15 is for example md5(15)
    handler.createPost(body, null, callback).then(
      (response) => {expect(JSON.stringify(response)).toBe(JSON.stringify(callback()))}
    )
  });
});