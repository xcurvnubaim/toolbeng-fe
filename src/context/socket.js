"use client"
import React from 'react';
import {io} from 'socket.io-client'

export const socket = io.connect("http://192.168.0.109:5000");
export const SocketContext = React.createContext(socket);