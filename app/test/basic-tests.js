'use strict';

const tap = require('tap');
const express = require('express');
const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

tap.runOnly = false;
tap.pass('Test file can be executed');

tap.test('Essential library can be loaded', assert => {
  assert.ok(express);
  assert.ok(mongoose);
  assert.ok(Joi);
  assert.end();
});


