import Type from "@/protocol/network/types/Type";

export default class Version extends Type {
  public major: number;
  public minor: number;
  public release: number;
  public revision: number;
  public patch: number;
  public buildType: number;

  constructor(major = 0, minor = 0, release = 0, revision = 0, patch = 0, buildType = 0) {
    super();
    this.major = major;
    this.minor = minor;
    this.release = release;
    this.revision = revision;
    this.patch = patch;
    this.buildType = buildType;
  }
}
