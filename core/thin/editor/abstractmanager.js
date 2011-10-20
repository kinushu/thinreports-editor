//  Copyright (C) 2011 Matsukei Co.,Ltd.
//
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.

goog.provide('thin.editor.AbstractManager');

goog.require('goog.array');
goog.require('goog.Disposable');


/**
 * @param {thin.editor.Layout} layout
 * @constructor
 * @extends {goog.Disposable}
 */
thin.editor.AbstractManager = function(layout) {
  
  /**
   * @type {Array}
   * @private
   */
  this.factors_ = [];
  
  /**
   * @type {thin.editor.Workspace}
   * @private
   */
  this.workspace_ = layout.getWorkspace();
  
  /**
   * @type {thin.editor.Layout}
   * @private
   */
  this.layout_ = layout;
};
goog.inherits(thin.editor.AbstractManager, goog.Disposable);


/**
 * @param {Object} factor
 * @param {number=} opt_index
 */
thin.editor.AbstractManager.prototype.add = function(factor, opt_index) {
  if (goog.isNumber(opt_index)) {
    goog.array.insertAt(this.factors_, factor, opt_index);
  } else {
    goog.array.insert(this.factors_, factor);
  }
};


/**
 * @param {Array} factors
 */
thin.editor.AbstractManager.prototype.set = function(factors) {
  this.factors_ = goog.array.clone(factors);
};


/**
 * @return {Array}
 */
thin.editor.AbstractManager.prototype.get = function() {
  return this.factors_;
};


/**
 * @return {Array}
 */
thin.editor.AbstractManager.prototype.getClone = function() {
  return goog.array.clone(this.factors_);
};


/**
 * Remove all factors.
 */
thin.editor.AbstractManager.prototype.clear = function() {
  goog.array.clear(this.factors_);
};


/**
 * @param {*} factor
 */
thin.editor.AbstractManager.prototype.remove = function(factor) {
  goog.array.remove(this.factors_, factor);
};


/**
 * @return {number}
 */
thin.editor.AbstractManager.prototype.getCount = function() {
  return this.factors_.length;
};


/**
 * @return {boolean}
 */
thin.editor.AbstractManager.prototype.isEmpty = function() {
  return goog.array.isEmpty(this.factors_);
};


/**
 * @return {boolean}
 */
thin.editor.AbstractManager.prototype.isSingle = function() {
  if (!this.isEmpty()) {
    return this.getCount() == 1;
  } else {
    return false;
  }
};


/**
 * @return {boolean}
 */
thin.editor.AbstractManager.prototype.isMultiple = function() {
  return !this.isEmpty() && !this.isSingle();
};


/**
 * @param {*} target
 * @return {boolean}
 */
thin.editor.AbstractManager.prototype.isExist = function(target) {
  return -1 != goog.array.findIndex(this.factors_, function(factor) {
    return factor == target;
  });
};


/** @inheritDoc */
thin.editor.AbstractManager.prototype.disposeInternal = function() {
  thin.editor.AbstractManager.superClass_.disposeInternal.call(this);
  delete this.factors_;
  delete this.workspace_;
  delete this.layout_;
};