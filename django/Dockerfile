FROM python:2.7

MAINTAINER Yuchong Pan <panyuchong@gmail.com>

RUN mkdir /code
WORKDIR /code
RUN mkdir /code/static

ADD requirements.txt /code/
RUN pip install -r requirements.txt

ADD . /code/
