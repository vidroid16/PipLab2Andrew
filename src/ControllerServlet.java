import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

public class ControllerServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            resp.setContentType("text/html;charset=UTF-8");
            //TODO get cookie jseccionid
            req.getRequestDispatcher("/check").forward(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        if(req.getParameterMap().size()==0){
            System.out.println("ZAEBIS");
            req.getRequestDispatcher("index.jsp").forward(req, resp);
        }
    }
    //    @Override
//    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        ArrayList<String> list = new ArrayList<>();
//        String x = req.getParameter("x0");
//        System.out.println(req.getParameter("x0"));
//        resp.getWriter().print(x.isEmpty() ? "Hello world" : x);
//        getServletContext().setAttribute("list", list);
//        resp.setHeader("content-type", "text/html;charset=UTF-8");
//        req.getRequestDispatcher("index.jsp").include(req, resp);
//        //resp.sendRedirect("index.jsp");
//
//    }
}
