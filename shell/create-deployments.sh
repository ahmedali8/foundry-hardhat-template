#!/usr/bin/env bash

MAIN_DIR=./generated
DIR=./generated/deployments

if [ ! -d "$MAIN_DIR" ];
then
  mkdir "$MAIN_DIR"
fi

if [ ! -d "$DIR" ];
then
  mkdir "$DIR"
fi
