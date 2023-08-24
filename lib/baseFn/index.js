/**
 *Created by limbo <yykaue@qq.com> on 2019/7/8.
 */
import checkPath from './checkPath'
import createAudio from './createAudio'
import deepCopy from './deepCopy'
import detectOS from './detectOS'
import downloadBlob from './downloadBlob'
import getEnv from './getEnv'
import getFormItemParams from './getFormItemParams'
import getRouteRegexpList from './getRouteRegexpList'
import getTextWidthByCanvas from './getTextWidthByCanvas'
import hasCodesInit from './hasCodesInit'
import HZRecorder from './HZRecorder'
import md5 from './md5'
import objProxy from './objProxy'
import randomName from './randomName'
import recursionAddRoutes from './recursionAddRoutes'
import resetRedirect from './resetRedirect'
import setWatermark from './setWatermark'
import splitStringByWidth from './splitStringByWidth'
import unique from './unique'
import updateCookie from './updateCookie'
import upperNumber from './upperNumber'

import { hexToRgb, rgbToHex, gradientColors } from './colorManage'
import { infoColor, infoStyle, printInformation } from './consoleManage'
import { setSession, getSession } from './sessionFn'

export {
  checkPath,
  createAudio,
  deepCopy,
  detectOS,
  downloadBlob,
  getEnv,
  getFormItemParams,
  getRouteRegexpList,
  getTextWidthByCanvas,
  hasCodesInit,
  HZRecorder,
  md5,
  objProxy,
  randomName,
  recursionAddRoutes,
  resetRedirect,
  setWatermark,
  splitStringByWidth,
  unique,
  updateCookie,
  upperNumber,

  hexToRgb,
  rgbToHex,
  gradientColors,
  infoColor,
  infoStyle,
  printInformation,
  setSession,
  getSession
}
