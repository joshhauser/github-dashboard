import { Color } from '@/shared/models';

export const API_BASE_URL: string = 'https://api.github.com/';
export const GITHUB_API_VERSIOn: string = '2022-11-28';
export const GITHUB_ACCEPT_HEADER: string = 'application/vnd.github+json';
export const GITHUB_USERNAME: string = 'joshhauser';
export const GITHUB_PAGINATION_TOTAL_REGEX: RegExp = /&page=(\d+)>; rel="last"/;
export const PALETTE: Color[] = [
  new Color(255, 192, 203),
  new Color(230, 230, 250),
  new Color(173, 216, 230),
  new Color(152, 251, 152),
  new Color(255, 218, 185),
  new Color(221, 160, 221),
  new Color(255, 255, 224),
  new Color(255, 160, 122),
  new Color(175, 238, 238),
  new Color(250, 235, 215),
  new Color(221, 160, 221),
  new Color(127, 255, 212),
  new Color(240, 248, 255),
  new Color(255, 160, 122),
  new Color(255, 255, 240),
  new Color(218, 112, 214),
  new Color(245, 255, 250),
  new Color(255, 228, 225),
  new Color(176, 196, 222),
  new Color(152, 251, 152),
  new Color(255, 239, 213),
  new Color(204, 204, 255),
  new Color(255, 255, 224),
  new Color(224, 176, 255),
  new Color(127, 255, 212),
  new Color(243, 229, 171),
  new Color(244, 194, 194),
  new Color(174, 198, 207),
  new Color(130, 211, 173),
  new Color(244, 164, 96),
  new Color(200, 162, 200),
  new Color(230, 248, 255),
  new Color(178, 255, 102),
  new Color(255, 222, 173),
  new Color(196, 195, 208),
  new Color(64, 224, 208),
  new Color(255, 255, 224),
  new Color(238, 130, 238),
  new Color(172, 225, 175),
  new Color(255, 229, 180),
];
