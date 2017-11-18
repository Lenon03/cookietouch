export default class TrustCertificate {
  public id: number;
  public hash: string;
  constructor(id = 0, hash = "") {

    this.id = id;
    this.hash = hash;

  }
}
