type marker = {
  markerLink: string;
  markerImageLink: string;
  uniqueId: string;
};

type link = {
  name: string;
  link: string;
};

export interface uploadMarker {
  marker: marker;
}
export interface createCard {
  cardImage: File;
  name: string;
  title: string;
  about: string;
  shortName: string;
  activeStatus: boolean;
  email: string;
  marker: marker;
  links: link[];
}
export interface CheckShortName {
  shortName: string;
}

export interface CheckShortNameResponse {
  status: string;
}
export interface UserCardsResponse {
  status: string;
}
