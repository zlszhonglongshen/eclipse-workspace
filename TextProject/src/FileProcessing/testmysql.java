package FileProcessing; 
/** 
* @author Johnson E-mail: 593956670@qq.com
* @version 创建时间：2018年12月13日 上午9:50:17 
* @Title: testmysql.java
*/
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class testmysql {
    public static void main(String []args) {
        Connection conn = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            // The newInstance() call is a work around for some
            // broken Java implementations

            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("加载成功");
        } catch (Exception ex) {
            System.out.println("加载失败");
            // handle the error
        }

        try {
            conn = DriverManager.getConnection("jdbc:mysql://106.13.40.243/mysql?"+"user=root&password=e64ad9165Fff9ac14Fa2334e57b45862&serverTimezone=GMT%2B8");

            System.out.println("连接成功");
            ps = conn.prepareStatement("select * from user;");
            rs = ps.executeQuery();
            while(rs.next()) {
                String name = rs.getString("User");
                System.out.print(name);
                System.out.println("");
            }


        } catch (SQLException ex) {
            // handle any errors
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
            System.out.println("连接失败");
        }
    }
}
