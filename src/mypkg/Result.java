package mypkg;

import java.io.Serializable;

public class Result implements Serializable {
    private double x;
    private int r;
    private double y;
    private boolean isIn;

    public Result(double x, double y, int r, boolean isIn) {
        this.x = x;
        this.r = r;
        this.y = y;
        this.isIn = isIn;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public int getR() {
        return r;
    }

    public void setR(int r) {
        this.r = r;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public boolean isIn() {
        return isIn;
    }

    public void setIn(boolean in) {
        isIn = in;
    }

}
