import { Injectable } from "@angular/core";

@Injectable()
export class UtilityService {
    private _flag = false;
    public get flag() {
        return this._flag;
    }
    public set flag(value) {
        this._flag = value;
    }

    isFaresWithTP = false;

    private _isFareDetails = false;
    public get isFareDetails() {
        return this._isFareDetails;
    }
    public set isFareDetails(value) {
        this._isFareDetails = value;
    }


    private _isFareDetailsCIF = false;
    public get isFareDetailsCIF() {
        return this._isFareDetailsCIF;
    }
    public set isFareDetailsCIF(value) {
        this._isFareDetailsCIF = value;
    }


    private _isFootnoteDetails = false;
    public get isFootnoteDetails() {
        return this._isFootnoteDetails;
    }
    public set isFootnoteDetails(value) {
        this._isFootnoteDetails = value;
    }


    private _isRuleDetails = false;
    public get isRuleDetails() {
        return this._isRuleDetails;
    }
    public set isRuleDetails(value) {
        this._isRuleDetails = value;
    }

    private _isRuleText = false;
    public get isRuleText() {
        return this._isRuleText;
    }
    public set isRuleText(value) {
        this._isRuleText = value;
    }
}
