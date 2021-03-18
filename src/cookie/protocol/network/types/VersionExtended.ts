import Version from "@/protocol/network/types/Version";

export default class VersionExtended extends Version {
  public install: number;
  public technology: number;

  constructor(
    major = 0,
    minor = 0,
    release = 0,
    revision = 0,
    patch = 0,
    buildType = 0,
    install = 0,
    technology = 0
  ) {
    super(major, minor, release, revision, patch, buildType);
    this.install = install;
    this.technology = technology;
  }
}
