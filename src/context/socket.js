"use client"
import API_BASE_URL from '@/apiorder/const';
import React from 'react';
import {io} from 'socket.io-client'

export const socket = io.connect(API_BASE_URL);
export const SocketContext = React.createContext(socket);