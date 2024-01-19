package com.traderise.traderiseback.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BollingerBandsData {
    @Id
    private Date date;
    private double upperBand;
    private double middleBand;
    private double lowerBand;
}
