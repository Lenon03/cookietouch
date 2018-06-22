import Type from "@/protocol/network/types/Type";

export default class TrustCertificate extends Type {
  public id: number;
  public hash: string;

  constructor(id = 0, hash = "") {
    super();
    this.id = id;
    this.hash = hash;
  }
}
