const _0x71d7=['tableName','6zuGPlI','4qnLGbf','queryByAdvancedFilter','limit','../errors/errors','build','delete',')\x20LIKE\x20?','andWhereRaw','count','search','queryByFilter','7LbBXLw','where','handleError','setId','column','2349jUzftI','code','value','message','deleteByFilter','handleConstraintError','9ulSarL','4480AHIUSL','7326RIkdGW','SQLITE_CONSTRAINT','../utils/PagedResult','getId','exports','queryById','SQLITE_ERROR','11546TgPuiL','substring','deleteById','orderBy','update','4HKsPoi','name','42220VjkQGa','offset','toLowerCase','insert','174800mQvFPk','count(*)','length','338219STHchS'];function _0x1ddb(_0x281919,_0x4bb2a7){_0x281919=_0x281919-0x86;let _0x71d7b8=_0x71d7[_0x281919];return _0x71d7b8;}const _0x2f9582=_0x1ddb;(function(_0x1f584e,_0x41c004){const _0x25c236=_0x1ddb;while(!![]){try{const _0xffe16f=-parseInt(_0x25c236(0x9d))*-parseInt(_0x25c236(0x8d))+parseInt(_0x25c236(0x94))*parseInt(_0x25c236(0x9e))+-parseInt(_0x25c236(0xa9))*-parseInt(_0x25c236(0x86))+parseInt(_0x25c236(0x98))+parseInt(_0x25c236(0xb4))*parseInt(_0x25c236(0xae))+parseInt(_0x25c236(0x92))*-parseInt(_0x25c236(0xb5))+-parseInt(_0x25c236(0x9b));if(_0xffe16f===_0x41c004)break;else _0x1f584e['push'](_0x1f584e['shift']());}catch(_0x585240){_0x1f584e['push'](_0x1f584e['shift']());}}}(_0x71d7,0x1f8d8));const {DataConstraintError,DatabaseError}=require(_0x2f9582(0xa1)),{PagedResult}=require(_0x2f9582(0x88));module[_0x2f9582(0x8a)]=class Repository{constructor(_0x20f4d7,_0x5559a6){const _0x4e4e4e=_0x2f9582;this['db']=_0x20f4d7,this[_0x4e4e4e(0x9c)]=_0x5559a6;}['getId'](_0x2e11fe){return{'id':_0x2e11fe['id']};}[_0x2f9582(0xac)](_0x899712,_0x354ba4){_0x354ba4['id']=_0x899712[0x0];}async[_0x2f9582(0x97)](_0x854282){const _0x3a95b7=_0x2f9582;try{const _0xce7c06=await this['db'](this['tableName'])[_0x3a95b7(0x97)](_0x854282);if(!_0xce7c06)return undefined;return this[_0x3a95b7(0xac)](_0xce7c06,_0x854282),_0x854282;}catch(_0x4ebbb9){throw this[_0x3a95b7(0xb3)](_0x4ebbb9);}}async[_0x2f9582(0x91)](_0x270426){const _0x17a433=_0x2f9582;try{const _0x12f737=await this['db'](this[_0x17a433(0x9c)])[_0x17a433(0xaa)](this[_0x17a433(0x89)](_0x270426))[_0x17a433(0x91)](_0x270426);if(_0x12f737===0x0)return undefined;return _0x270426;}catch(_0x1f08b7){throw this['handleConstraintError'](_0x1f08b7);}}async[_0x2f9582(0x8f)](_0xa5aec3){const _0x8f171a=_0x2f9582;return await this[_0x8f171a(0xb2)]({'id':_0xa5aec3});}async[_0x2f9582(0xb2)](_0x42ddb5){const _0x1a35a7=_0x2f9582;try{return await this['db'](this[_0x1a35a7(0x9c)])[_0x1a35a7(0xaa)](_0x42ddb5)[_0x1a35a7(0xa3)]();}catch(_0x417f2c){throw this[_0x1a35a7(0xab)](_0x417f2c);}}async[_0x2f9582(0x8b)](_0x5cc18e){const _0x2abd26=_0x2f9582;return await this[_0x2abd26(0xa8)]({'id':_0x5cc18e});}async[_0x2f9582(0xa8)](_0x2ea1e2){const _0x4beab2=_0x2f9582;try{const _0x164a07=await this['db'](this[_0x4beab2(0x9c)])[_0x4beab2(0xaa)](_0x2ea1e2);if(_0x164a07[_0x4beab2(0x9a)]===0x0)return undefined;return _0x164a07[0x0];}catch(_0x240fba){throw this[_0x4beab2(0xab)](_0x240fba);}}async[_0x2f9582(0x9f)](_0x50d83c,_0xd77b37={'column':_0x2f9582(0x93),'value':''},_0x59e645,_0x273012,_0x293cd1,_0x350f94){const _0x45d88b=_0x2f9582;try{let _0x5cb7ec=this['db'](this[_0x45d88b(0x9c)]);if(_0x50d83c)_0x5cb7ec=_0x5cb7ec[_0x45d88b(0xaa)](_0x50d83c);if(_0xd77b37)_0x5cb7ec=_0x5cb7ec[_0x45d88b(0xa5)]('LOWER('+_0xd77b37[_0x45d88b(0xad)]+_0x45d88b(0xa4),'%'+_0xd77b37[_0x45d88b(0xb0)][_0x45d88b(0x96)]()+'%');if(_0x293cd1&&_0x350f94)_0x5cb7ec=_0x5cb7ec[_0x45d88b(0x90)](_0x293cd1,_0x350f94);const _0x561d09=PagedResult[_0x45d88b(0xa0)](_0x273012),_0x4c917f=PagedResult[_0x45d88b(0x95)](_0x59e645,_0x561d09),_0x47e347=await _0x5cb7ec['offset'](_0x4c917f)[_0x45d88b(0xa0)](_0x561d09),_0x34e315=await _0x5cb7ec[_0x45d88b(0xa6)]();return PagedResult[_0x45d88b(0xa2)]({'totalCount':_0x34e315[0x0][_0x45d88b(0x99)],'offset':_0x4c917f,'limit':_0x561d09,'orderBy':_0x293cd1,'direction':_0x350f94,'content':_0x47e347});}catch(_0x4004bb){throw this[_0x45d88b(0xab)](_0x4004bb);}}[_0x2f9582(0xab)](_0x23d068){const _0x34852b=_0x2f9582;if(_0x23d068[_0x34852b(0xaf)]===_0x34852b(0x8c)){let _0x105f85=_0x23d068[_0x34852b(0xb1)];const _0x53327e='SQLITE_ERROR:\x20',_0x32c072=_0x105f85[_0x34852b(0xa7)](_0x53327e)+_0x53327e[_0x34852b(0x9a)];return _0x105f85=_0x105f85[_0x34852b(0x8e)](_0x32c072,_0x105f85[_0x34852b(0x9a)]),new DatabaseError([_0x105f85]);}else return _0x23d068;}[_0x2f9582(0xb3)](_0x2a8d35){const _0x5b06a1=_0x2f9582;if(_0x2a8d35[_0x5b06a1(0xaf)]===_0x5b06a1(0x87)){let _0x105a9d=_0x2a8d35[_0x5b06a1(0xb1)];const _0x31f5fa='SQLITE_CONSTRAINT:\x20',_0x1acbfc=_0x105a9d['search'](_0x31f5fa)+_0x31f5fa[_0x5b06a1(0x9a)];return _0x105a9d=_0x105a9d[_0x5b06a1(0x8e)](_0x1acbfc,_0x105a9d[_0x5b06a1(0x9a)]),new DataConstraintError([_0x105a9d]);}else return _0x2a8d35;}};