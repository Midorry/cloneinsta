import Order from "../models/Order.js";
import express from "express";
import moment from "moment";
import QueryString from "qs";
import { md5 } from "js-md5";
import * as crypto from "crypto";
import axios from "axios";
import CryptoJS from "crypto-js";

export const newOrder = async (req, res, next) => {
    try {
        const {
            userId,
            cartId,
            payments,
            address,
            dateOrder,
            status,
            invoiceDate,
            total,
        } = req.body;

        const newOder = new Order({
            userId,
            cartId,
            payments,
            address,
            dateOrder,
            status,
            invoiceDate,
            total,
        });
        const savedOrder = await newOder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const orders = await Order.findById(id);
        res.status(200).json(orders);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getOrderUser = async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
        if (userId) {
            const orders = await Order.find({
                userId: {
                    $regex: userId,
                    $options: "i",
                },
            });
            res.status(200).json(orders);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const filterOrder = async (req, res) => {
    const status = req.query.status;
    try {
        if (status) {
            const orders = await Order.find({
                status: {
                    $regex: status,
                    $options: "i",
                },
            });
            res.status(200).json(orders);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
