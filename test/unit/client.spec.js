import { expect } from 'chai';
import { Axios } from '../../src/client';

describe('Axios Client', () => {
  it('should return instance of Axios', () => {
    expect(Axios).to.exist;
    expect(Axios).to.be.an('function');
    expect(Axios.get).to.exist.and.to.be.a('function');
    expect(Axios.post).to.exist.and.to.be.a('function');
    expect(Axios.put).to.exist.and.to.be.a('function');
    expect(Axios.patch).to.exist.and.to.be.a('function');
    expect(Axios.delete).to.exist.and.to.be.a('function');
  });
});
