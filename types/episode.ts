export interface ICategory {
  id: number;
  name: string;
  children?: ICategory[];
}

export interface ILabel {
  id?: number;
  rus: string;
  eng: string;
}

export interface IRelease {
  id?: number;
  date: string;
  name: string;
}

export interface IDub {
  id?: number;
  code: string;
  name: string;
}

export interface ISub {
  id?: number;
  code: string | null;
  name: string;
}

export interface IEpisode {
  id?: number;
  localId: number;
  categoryId: number;
  path: string;
  // note: string;
  thumbnail: string;
  title: ILabel;
  description: ILabel;
  dubs: IDub[];
  subtitles: ISub[];
  videos: string[];
  songs: string[];
  writers: string[];
  releases: IRelease[];
}
