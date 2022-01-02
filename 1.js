// To parse this JSON data, do
//
//     final bir = birFromJson(jsonString);

import 'dart:convert';

Bir birFromJson(String str) => Bir.fromJson(json.decode(str));

String birToJson(Bir data) => json.encode(data.toJson());

class Bir {
    Bir({
        this.length,
        this.data,
    });

    int length;
    List < List < Datum >> data;

    factory Bir.fromJson(Map < String, dynamic > json) => Bir(
        length: json["length"],
        data: List < List < Datum >> .from(json["data"].map((x) => List < Datum > .from(x.map((x) => Datum.fromJson(x))))),
    );

    Map < String, dynamic > toJson() => {
        "length": length,
        "data": List < dynamic > .from(data.map((x) => List < dynamic > .from(x.map((x) => x.toJson())))),
    };
}

class Datum {
    Datum({
        this.serialNo,
        this.tag,
        this.idNumberRank,
        this.name,
        this.image,
    });

    String serialNo;
    String tag;
    String idNumberRank;
    String name;
    String image;

    factory Datum.fromJson(Map < String, dynamic > json) => Datum(
        serialNo: json["Serial No."],
        tag: json["Tag"],
        idNumberRank: json["ID Number & Rank"],
        name: json["Name"],
        image: json["Image"],
    );

    Map < String, dynamic > toJson() => {
        "Serial No.": serialNo,
        "Tag": tag,
        "ID Number & Rank": idNumberRank,
        "Name": name,
        "Image": image,
    };
}